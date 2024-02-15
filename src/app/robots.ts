import { MetadataRoute } from 'next'
export default function robots (): MetadataRoute.Robots {
    return {
        rules: [
            {
          //just sitemap is added here allow and disallow are kept same as before
        userAgent: '*',
        allow: ['/$', '/about'],
        disallow: '/'
      }
    ],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL}/sitemap.xml`
  }
}
