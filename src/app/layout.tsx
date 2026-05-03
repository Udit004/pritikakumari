import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/toaster";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pritika Kumari | HR Operations Specialist | HR Generalist | HR Analyst",
  description: "MBA-qualified HR Operations professional with expertise in employee lifecycle management, HRMS administration, payroll coordination, and data-driven HR insights. Specialized in HR processes, compliance, and technology-driven environments.",
  keywords: [
    "HR Operations",
    "HR Generalist",
    "HR Analyst",
    "Employee Lifecycle Management",
    "HRMS Administration",
    "Payroll Coordination",
    "HR Professional",
    "Data-Driven HR",
    "Compliance",
    "Employee Engagement",
    "People Management",
  ],
  authors: [{ name: "Pritika Kumari" }],
  openGraph: {
    title: "Pritika Kumari | HR Operations Specialist",
    description:
      "Explore the portfolio of Pritika Kumari, an experienced HR Operations professional specializing in employee lifecycle management and HRMS administration.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <Toaster />
        {children}
      </body>
    </html>
  );
}
