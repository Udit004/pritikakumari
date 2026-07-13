import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "@/components/toaster";
import "./globals.css";
import Script from "next/script";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import ClarityProvider from "@/components/ClarityProvider";
import LenisProvider from "@/components/LenisProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pritikakumari.vercel.app"),

  title: {
    default:
      "Pritika Kumari | HR Operations Specialist | HR Generalist | HR Analyst",
    template: "%s | Pritika Kumari",
  },

  description:
    "Pritika Kumari is an MBA-qualified HR Operations Specialist with expertise in HRMS administration, employee lifecycle management, payroll coordination, compliance management, recruitment support, HR analytics, and people operations.",

  keywords: [
    "Pritika",
    "Pritika Kumari",
    "Pritika Tiwari",
    "HR Executive",
    "HR Operations Specialist",
    "HR Generalist",
    "HR Analyst",
    "People Operations",
    "HRMS Administration",
    "Payroll Coordination",
    "Employee Lifecycle Management",
    "Human Resources",
    "Talent Management",
    "Recruitment",
    "Employee Engagement",
    "HR Compliance",
    "MBA HR",
    "HR Professional India",
  ],

  authors: [
    {
      name: "Pritika Kumari",
    },
  ],

  creator: "Pritika Kumari",

  publisher: "Pritika Kumari",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    title:
      "Pritika Kumari (Pritika Tiwari) | HR Operations Specialist | HR Generalist",

    description:
      "Pritika Kumari, also known as Pritika Tiwari, is an MBA-qualified HR professional specializing in employee lifecycle management, HRMS administration, payroll coordination, HR analytics, and compliance.",

    url: "https://pritikakumari.vercel.app",

    siteName: "Pritika Kumari Portfolio",

    locale: "en_US",

    type: "profile",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Pritika Kumari HR Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Pritika Kumari (Pritika Tiwari) | HR Operations Specialist",
    description:
      "Pritika Kumari, also known as Pritika Tiwari, is an HR Operations Specialist with expertise in HRMS, payroll, compliance, and employee lifecycle management.",
    images: ["/og-image.png"],
  },

  alternates: {
    canonical: "https://pritikakumari.vercel.app",
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
        <GoogleAnalytics />
        <ClarityProvider />
        <Toaster />
        <LenisProvider>{children}</LenisProvider>

        <Script
          id="person-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",

              name: "Pritika Kumari",

              alternateName: ["Pritika", "Pritika Tiwari"],

              url: "https://pritikakumari.vercel.app",

              jobTitle: "HR Operations Specialist",

              description:
                "MBA-qualified HR Operations Specialist specializing in employee lifecycle management, HRMS administration, payroll coordination and HR analytics.",

              image:
                "https://pritikakumari.vercel.app/profile.jpg",

              knowsAbout: [
                "Human Resources",
                "HR Operations",
                "HR Analytics",
                "HRMS",
                "Payroll Management",
                "Employee Lifecycle Management",
                "Compliance",
              ],

              sameAs: [
                "https://www.linkedin.com/in/pritika-kumari-a68192376/",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
