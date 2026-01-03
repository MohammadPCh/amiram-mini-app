import React from "react";

export default function MobileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full max-w-lg h-screen shadow-xl">{children}</section>
  );
}
