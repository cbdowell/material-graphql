import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = `
    type Query {
        hello: String
        links: String
    }
`

const resolvers = {
    Query: {
        hello: (root, args, context) => {
            return 'Hello world!'
        },
        links: (root, args, context) => {
            return 'foo link'
        }
    }
}

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

export function context(headers, secrets) {
    return {
        headers,
        secrets
    }
}
