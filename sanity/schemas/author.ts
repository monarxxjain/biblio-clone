import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Name'
    }),
    defineField({
      type: 'slug',
      name: 'slug',
      title: 'Slug',
      options: {
          maxLength: 96,
        source: 'name'
    }
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true
      }
    }),
    defineField({
      name: 'bio',
      type: 'array',
      title: 'Bio',
      of: [
        {
            type: 'block',
            title: 'Block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: []
        }
      ]
    })
  ],
  preview: {
    select: {
        media: 'image',
      title: 'name'
    }
  }
})
