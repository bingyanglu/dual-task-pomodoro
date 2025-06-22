import type { Metadata } from "next"

const siteConfig = {
  name: "듀얼 태스크 뽀모도로 - ADHD 친화적 작업법",
  description: "ADHD 친화적 듀얼 태스크 뽀모도로 타이머. 두 작업을 번갈아가며 집중할 수 있는 도구 — 더 나은 주의력, 더 적은 번아웃, 그리고 부드러운 구조를 위해 설계되었습니다.",
  url: "https://dual-task-pomodoro.com/ko",
  ogImage: "https://dual-task-pomodoro.com/og-image-ko.png",
}

export const metadata: Metadata = {
  metadataBase: new URL("https://dual-task-pomodoro.com"),
  title: {
    default: siteConfig.name,
    template: `%s | 듀얼 태스크 뽀모도로`,
  },
  description: siteConfig.description,
  keywords: [
    "뽀모도로",
    "ADHD",
    "집중",
    "타이머",
    "생산성",
    "듀얼 태스크",
  ],
  alternates: {
    canonical: "/ko",
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
    locale: "ko_KR",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: "듀얼 태스크 뽀모도로",
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

export default function KoreanLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
} 