// books.js
export default {
    name: 'book',
    title: 'Book',
    type: 'document',
    fields: [
        {
            name: 'id',
            title: 'ID',
            type: 'string',
            description: 'Unique identifier for the book'
        },
        {
            name: 'summaries',
            title: 'Summaries',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            description: 'Label for the summary'
                        },
                        {
                            name: 'summary',
                            title: 'Summary',
                            type: 'text',
                            description: 'Brief summary or description of the book'
                        }
                    ]
                }
            ],
            description: 'List of summaries of the book'
        },
        {
            name: 'audios',
            title: 'Audios',
            type: 'array',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'label',
                            title: 'Label',
                            type: 'string',
                            description: 'Label for the audio'
                        },
                        {
                            name: 'audio',
                            title: 'Audio',
                            type: 'file',
                            description: 'Audio version of the book'
                        }
                    ]
                }
            ],
            description: 'List of audio versions of the book'
        }
    ]
}
