import type { Metadata } from "next"

const siteConfig = {
  name: "Dual-Task Pomodoro - ADHD-freundliche Arbeitsmethode",
  description: "ADHD-freundlicher Dual-Task Pomodoro Timer. Ein Fokus-Tool, das zwischen zwei Aufgaben wechselt — gebaut für bessere Aufmerksamkeit, weniger Burnout und sanfte Struktur.",
  url: "https://dual-task-pomodoro.com/de",
  ogImage: "https://dual-task-pomodoro.com/og-image-de.png",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://dual-task-pomodoro.com"),
  title: {
    default: siteConfig.name,
    template: `%s | Dual-Task Pomodoro`,
  },
  description: siteConfig.description,
  keywords: [
    "Pomodoro",
    "ADHS",
    "Fokus",
    "Timer",
    "Produktivität",
    "Dual Task",
  ],
  alternates: {
    canonical: "/de",
    languages: {
      "en": "/",
      "zh": "/zh",
      "ja": "/ja",
      "zh-TW": "/zh-TW",
      "ko": "/ko",
      "es": "/es",
      "de": "/de",
      "pt": "/pt",
      "fr": "/fr",
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: "Dual-Task Pomodoro",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: "@your_handle",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
}

export default function GermanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 