import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Masuk",
  description: "Simulasi keamanan — gunakan akun demo saja.",
  robots: "noindex, nofollow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
