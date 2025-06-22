import { MetadataRoute } from 'next'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://dual-task-pomodoro.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = ["", "/zh", "/ja", "/zh-TW"]
  
  const routes = languages.map((lang) => {
    const alternates: { [key: string]: string } = {
      'x-default': `${siteUrl}/`,
      'en': `${siteUrl}/`,
      'zh': `${siteUrl}/zh`,
      'ja': `${siteUrl}/ja`,
      'zh-TW': `${siteUrl}/zh-TW`,
    }

    return {
      url: `${siteUrl}${lang}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: lang === "" ? 1 : 0.8,
      alternates: {
        languages: alternates,
      },
    }
  });

  return routes;
} 