import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import ThemeProvider from "@/components/ThemeProvider";
import ScrollToTop from "@/components/ScrollToTop";
import CookieConsent from "@/components/CookieConsent";

export const metadata: Metadata = {
  title: "Donut Studio — Artisanal Pastry",
  description:
    "Gogoși artizanale premium realizate cu ingrediente naturale de calitate. Adaugă savoare zilei tale cu Donut Studio.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className="h-full antialiased" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/logo.svg?v=3" type="image/svg+xml" />
        <link rel="icon" href="/icon.png?v=3" type="image/png" />
        <script dangerouslySetInnerHTML={{ __html: `try{var t=JSON.parse(localStorage.getItem('donut-theme')||'{}')?.state?.theme||'dark';document.documentElement.setAttribute('data-theme',t)}catch{}` }} />
      </head>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
          <ScrollToTop />
          <CookieConsent />
        </ThemeProvider>
      </body>
    </html>
  );
}
