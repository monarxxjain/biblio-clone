import { type SchemaTypeDefinition } from 'sanity'
import book from './schemas/book'
import blockContent from './schemas/blockContent'
import author from './schemas/author'
import category from './schemas/category'
import post from './schemas/post'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [book,blockContent, author, category, post],
}
