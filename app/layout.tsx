import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/redux/provider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "JPMP",
  description:
    "Personalized wellness juices and snacks served in a sleek, modern JPMP experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-amplitude`}
      >
        <Providers>{children}</Providers>
        <Toaster
          position="top-center"
          toastOptions={{
            duration: 4000,
            style: {
              background: "#ffffff",
              color: "#000000",
              fontSize: "16px",
              fontWeight: "500",
              borderRadius: "8px",
              padding: "12px 16px",
              border: "1px solid #e5e7eb",
              boxShadow:
                "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            },
            success: {
              iconTheme: {
                primary: "#7AC943",
                secondary: "#ffffff",
              },
            },
            error: {
              iconTheme: {
                primary: "#C1272D",
                secondary: "#ffffff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
