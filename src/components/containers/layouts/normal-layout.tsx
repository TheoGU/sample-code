import React from "react";

interface Props {
  children: React.ReactNode;
}

export function NormalLayout({ children }: Props) {
  return (
    <main>
      <div className="container mx-auto min-h-screen py-5">{children}</div>
    </main>
  );
}
