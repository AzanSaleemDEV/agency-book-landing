import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { cookies } from "next/headers";
import { PriceProvider } from "@/lib/PriceContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "7-Figure Agency Mindset A-Z | Best Seller Entrepreneurship Growth Book By Hamid Mahmood",
  description:
    "7-Figure Agency Mindset A-Z is a book by Hamid Mahmood that teaches you how to start and grow a marketing agency to reach million-dollar success and beyond. Order now!",
  keywords: ["marketing agency", "agency growth", "entrepreneurship", "Hamid Mahmood", "7-Figure Agency Mindset A-Z", "digital marketing agency book"],
  openGraph: {
    title: "7-Figure Agency Mindset A-Z | Best Seller Entrepreneurship Growth Book By Hamid Mahmood",
    description:
      "7-Figure Agency Mindset A-Z is a book by Hamid Mahmood that teaches you how to start and grow a marketing agency to reach million-dollar success and beyond. Order now!",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const country = (await cookies()).get("country")?.value ?? "";

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <PriceProvider country={country}>{children}</PriceProvider>
      </body>
    </html>
  );
}
