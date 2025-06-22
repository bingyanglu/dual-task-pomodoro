import type { Metadata } from "next"

const siteConfig = {
  name: "Pomodoro Dual-Task - Méthode de travail ADHD-Friendly",
  description: "Minuteur Pomodoro Dual-Task ADHD-Friendly. Un outil de concentration qui tourne entre deux tâches — construit pour une meilleure attention, moins d'épuisement et une structure douce.",
  url: "https://dual-task-pomodoro.com/fr",
  ogImage: "https://dual-task-pomodoro.com/og-image-fr.png",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://dual-task-pomodoro.com"),
  title: {
    default: siteConfig.name,
    template: `%s | Pomodoro Dual-Task`,
  },
  description: siteConfig.description,
  keywords: [
    "Pomodoro",
    "ADHD",
    "Concentration",
    "Minuteur",
    "Productivité",
    "Dual Task",
  ],
  alternates: {
    canonical: "/fr",
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
    locale: "fr_FR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: "Pomodoro Dual-Task",
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

export default function FrenchLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 