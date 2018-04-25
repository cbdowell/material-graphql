// Welcome to Launchpad!
// Log in to edit and save pads, run queries in GraphiQL on the right.
// Click "Download" above to get a zip with a standalone Node.js server.
// See docs and examples at https://github.com/apollographql/awesome-launchpad

import { makeExecutableSchema } from 'graphql-tools'

const typeDefs = `
  type Query {
    hello: String
  }
`

const resolvers = {
    Query: {
        hello: (root, args, context) => {
            return 'Hello world!'
        }
    }
}

export const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

// Optional: Export a function to get context from the request. It accepts two
// parameters - headers (lowercased http headers) and secrets (secrets defined
// in secrets section). It must return an object (or a promise resolving to it).
export function context(headers, secrets) {
    return {
        headers,
        secrets
    }
}

// Optional: Export a root value to be passed during execution
// export const rootValue = {};

// Optional: Export a root function, that returns root to be passed
// during execution, accepting headers and secrets. It can return a
// promise. rootFunction takes precedence over rootValue.
// export function rootFunction(headers, secrets) {
//   return {
//     headers,
//     secrets,
//   };
// };
