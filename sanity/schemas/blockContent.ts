import { defineArrayMember,defineType} from 'sanity'
export default defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
         type: 'block',
      title: 'Block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H2', value: 'h2'},
        {title: 'H1', value: 'h1'},
        {title: 'H4', value: 'h4'},
        {title: 'H3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
      marks:{decorators: [{title: 'Strong', value: 'strong'},{title: 'Emphasis', value: 'em'},],
        annotations: [{title: 'URL',name: 'link',type: 'object',fields: [{title: 'URL',name: 'href',type: 'url',},],},],},}),
    defineArrayMember({
      type: 'image',
      options: {hotspot: true},
    }),
  ],
})