import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/lib/registry";
import { Header } from "@/components/Header";
import { ErrorBoundary } from "react-error-boundary";
import { SwContainer } from "@/components/SwContainer";
import { TopicTitle } from "@/components/TopicTitle";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SWStarter",
  description: "SWStarter - Star Wars app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-screen">
      <body className={`${montserrat.variable} antialiased h-screen flex flex-col`}>
        <StyledComponentsRegistry>
          <Header />
          {/* 50px for the header */}
          <main className="w-full lg:h-[calc(100vh-50px)] px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto py-[30px]">
            <ErrorBoundary
              fallback={
                <SwContainer>
                  <TopicTitle title="Error" />
                  <p>Oops! Something went wrong.</p>
                </SwContainer>
              }>
              {children}
            </ErrorBoundary>
          </main>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
