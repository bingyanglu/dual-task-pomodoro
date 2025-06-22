import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // 注意：请将这里的URL替换为您的实际域名
  const baseUrl = 'https://dual-task-pomodoro.com'

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/`,
          zh: `${baseUrl}/zh`,
          ja: `${baseUrl}/ja`,
        },
      },
    },
    {
      url: `${baseUrl}/zh`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/`,
          zh: `${baseUrl}/zh`,
          ja: `${baseUrl}/ja`,
        },
      },
    },
    {
      url: `${baseUrl}/ja`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/`,
          zh: `${baseUrl}/zh`,
          ja: `${baseUrl}/ja`,
        },
      },
    },
  ]
} 