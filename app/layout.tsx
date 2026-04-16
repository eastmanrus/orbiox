import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Orbiox - система управления БДД",
  description:
    "Единая цифровая платформа для контроля допуска водителей и транспортных средств, обязательных процедур и рисков на линии.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
