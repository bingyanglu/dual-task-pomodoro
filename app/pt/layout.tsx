import type { Metadata } from "next"

const siteConfig = {
  name: "Pomodoro Dual-Task - Método de trabalho ADHD-Friendly",
  description: "Temporizador de Pomodoro Dual-Task ADHD-Friendly. Uma ferramenta de foco que gira entre duas tarefas — construída para uma melhor atenção, menos esgotamento e estrutura suave.",
  url: "https://dual-task-pomodoro.com/pt",
  ogImage: "https://dual-task-pomodoro.com/og-image-pt.png",
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
    "Foco",
    "Temporizador",
    "Produtividade",
    "Dual Task",
  ],
  alternates: {
    canonical: "/pt",
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
    locale: "pt_PT",
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

export default function PortugueseLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 