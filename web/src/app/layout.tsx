import Navbar from "@/components/Navbar";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coding Test by @agthumoe",
  description: "Coding Test by @agthumoe",
};

const navigation = [
  { name: "Home", href: "/" },
  { name: "Products", href: "/products" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar navigation={navigation} />
        <div className="flex min-h-screen flex-col items-center justify-between p-10 bg-gray-50">
          <div className="container mx-auto max-w-6xl">{children}</div>
        </div>
      </body>
    </html>
  );
}
