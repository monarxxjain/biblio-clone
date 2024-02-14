import { createClient, groq } from 'next-sanity'
import { ClientConfig } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn, token } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
  token
})

// uses GROQ
export async function getPosts () {
  const posts = await client.fetch(groq`*[_type == 'post']{
  _id,
  title,
  "image": mainImage.asset->url,
  "slug": slug.current,
  // "body": pt::text(body),
  publishedAt,
  "author": *[_id == ^.author._ref && _type == 'author'][0]{
    _id,
    name,
    "slug": slug.current
  },
  categories[]->{
    _id,
    title
  },
  "content": body
}`)
  return posts
}
