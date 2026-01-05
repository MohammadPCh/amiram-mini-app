import React from "react";

export default function CenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full h-screen flex items-center justify-center">
      {children}
    </section>
  );
}
