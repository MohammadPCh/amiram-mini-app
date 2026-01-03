import { getStoredTokens, setStoredTokens } from "./storage";
import type { JwtTokens, RefreshResponse } from "./types";

export class ApiError extends Error {
  status: number;
  body: unknown;
  constructor(message: string, status: number, body: unknown) {
    super(message);
    this.status = status;
    this.body = body;
  }
}

function getBaseUrl(): string {
  // Postman doc examples are like: http://localhost/api/...
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  return "https://users-bot-staging.amirambit.com";
}

function buildUrl(path: string): string {
  const base = getBaseUrl();
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${base}${p}`;
}

async function parseJsonSafely(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

async function refreshAccessToken(tokens: JwtTokens): Promise<JwtTokens> {
  const res = await fetch(buildUrl("/api/auth/refresh"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: tokens.refresh_token }),
  });
  const body = (await parseJsonSafely(res)) as RefreshResponse | unknown;
  if (!res.ok) {
    throw new ApiError("Failed to refresh token", res.status, body);
  }
  const next = (body as RefreshResponse).tokens;
  setStoredTokens(next);
  return next;
}

export async function apiFetch<T>(
  path: string,
  init?: RequestInit & { auth?: boolean }
): Promise<T> {
  const auth = init?.auth !== false;
  const headers = new Headers(init?.headers || {});

  if (!headers.has("Content-Type") && init?.body) {
    headers.set("Content-Type", "application/json");
  }

  let tokens = getStoredTokens();
  if (auth && tokens?.access_token) {
    headers.set("Authorization", `Bearer ${tokens.access_token}`);
  }

  const doRequest = async (overrideTokens?: JwtTokens | null) => {
    const h = new Headers(headers);
    if (auth) {
      const t = overrideTokens ?? tokens;
      if (t?.access_token) h.set("Authorization", `Bearer ${t.access_token}`);
    }
    return await fetch(buildUrl(path), { ...init, headers: h });
  };

  let res = await doRequest();
  if (auth && res.status === 401 && tokens?.refresh_token) {
    try {
      tokens = await refreshAccessToken(tokens);
      res = await doRequest(tokens);
    } catch (e) {
      setStoredTokens(null);
      throw e;
    }
  }

  const body = await parseJsonSafely(res);
  if (!res.ok) {
    throw new ApiError("Request failed", res.status, body);
  }
  return body as T;
}
