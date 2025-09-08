import { cairo } from "@/fonts/fonts";
import { ClientProvider } from "@/context/client-provider";

import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body
        className={`${cairo.className} antialiased`}
      >
        <ClientProvider>
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
