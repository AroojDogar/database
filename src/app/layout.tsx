
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BankAssist | Banking Information Assistant",
  description:
    "A professional rule-based banking information and customer support chatbot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
