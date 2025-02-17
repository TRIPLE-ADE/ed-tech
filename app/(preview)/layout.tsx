import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { Geist } from "next/font/google";
import { Header, Footer } from "@/components/layout";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Edtech",
  description: "AI powered edtech platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geist.className}`}>
      <body>
        <ThemeProvider attribute="class" enableSystem defaultTheme="system">
          <Toaster position="top-center" richColors />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
