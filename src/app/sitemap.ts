import { MetadataRoute } from 'next'
import { BookSummaryId, getPostIds } from '../../sanity/lib/client'
export default async function sitemap (): Promise<MetadataRoute.Sitemap> {
  const postIds = await getPostIds();
  const booksummaryid = await BookSummaryId();
  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
      lastModified: new Date()
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs`,
      lastModified: new Date()
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/contact`,
      lastModified: new Date()
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/disclaimer`,
      lastModified: new Date()
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/forgotpassword`,
      lastModified: new Date()
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/library`,
      lastModified: new Date()
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/login`,
      lastModified: new Date()
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/offline`,
      lastModified: new Date()
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/privacy`,
      lastModified: new Date()
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/quotes`,
      lastModified: new Date()
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/search`,
      lastModified: new Date()
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/signup`,
      lastModified: new Date()
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      lastModified: new Date()
    },
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/work/quotes`,
      lastModified: new Date()
    },
    ...postIds.map((post: any) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/blogs/${post._id}`,
      lastModified: new Date()
    })),
    ...booksummaryid.map((post: any) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/book/show/${post.id}`,
      lastModified: new Date()
    }))
  ]
}
