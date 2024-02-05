import { type SchemaTypeDefinition } from 'sanity'
import book from './schemas/book'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [book],
}
