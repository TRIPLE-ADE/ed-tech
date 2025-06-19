import "./globals.css";
import { Metadata } from "next";
import { Toaster } from "sonner";
import { ThemeProvider } from "next-themes";
import { Geist, Bebas_Neue } from "next/font/google";
import { AuthProvider } from "@/features/auth/contexts/auth-context";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Thryx | AI-Powered EdTech Platform",
  description:
    "Thryx is an innovative AI-powered edtech platform that transforms complex educational content into engaging, accessible learning experiences.",
  keywords: [
    "EdTech",
    "AI Learning",
    "Personalized Education",
    "Online Learning",
    "Quiz Generator",
    "Content Summarization",
  ],
  authors: [{ name: "Thryx", url: "https://thryx.com" }],
  openGraph: {
    title: "Thryx - Revolutionizing Education with AI",
    description:
      "Discover Thryx, a cutting-edge edtech platform that uses AI to simplify learning, generate interactive quizzes, and deliver insightful content summaries.",
    url: "https://thryx.com",
    siteName: "Thryx",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "@thryx",
    creator: "@thryx",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      suppressHydrationWarning
      className={`${geist.className} ${bebasNeue.variable}`}
    >
      <body>
        <ThemeProvider attribute='class' enableSystem defaultTheme='system'>
          <AuthProvider>
            <Toaster position='top-center' richColors />
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
