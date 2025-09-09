import { Metadata } from "next";
import { cairo } from "@/fonts/fonts";
import { QueryClientProvider } from "@/context/client-provider";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"

import "./globals.css";

import { AuthProvider } from "@/features/auth/context/auth-context";

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
        {/* Provides React Query Client */}
        <QueryClientProvider>
          {/* Provides auth logic and state to other components */}
          <AuthProvider>
            {children}
          </AuthProvider>
        </QueryClientProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
