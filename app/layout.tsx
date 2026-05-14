import Container from "@/app/components/layout/Container";
import DataNotice from "@/app/components/layout/DataNotice";
import Footer from "@/app/components/layout/Footer";
import Header from "@/app/components/layout/Header";
import "@/app/globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

/**
 * `RootLayout` component
 * 
 * This is the root layout component for the application. It wraps all pages and components,
 * providing a consistent structure and styling across the app. It includes the header, main content area,
 * and integrates Vercel utilities for analytics and performance insights.
 * 
 * @param {Object} props - The component props
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout
 * 
 * @returns {JSX.Element} The rendered root layout component
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Header />

        <DataNotice />

        <div className="flex-1">
          <Container className="shadow-md/30">
            {children}
          </Container>
        </div>

        <Footer />

        {/* ---- VERCEL UTILITIES ---- */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}