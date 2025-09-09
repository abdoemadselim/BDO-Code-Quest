import { cairo } from "@/fonts/fonts";
import { ClientProvider } from "@/context/client-provider";

import "./globals.css"; import { Metadata } from "next";
import { AuthProvider } from "@/features/auth/context/auth-context";
import { Toaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: "ولادة حلم- للاستشارات والأبحاث",
  description: "شركة ولادة حلم للإستشارات والأبحاث - نسعى دائما لابتكار حلول وخدمات فريدة تتناسب مع احتياجات شركائنا في التغيير نوفر الأدوات الداعمة لتحقيق الأهداف لنكون الحاضن الأول للقطاع الغير ربحي",
  publisher: "ولادة حلم"
};

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
          <AuthProvider>
            {children}
          </AuthProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
