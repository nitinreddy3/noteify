// index.js
// This is the main entry point of our application

const express = require('express');
const app = express()
const { ApolloServer, gql } = require('apollo-server-express')
const port = process.env.PORT || 4000

let notes = [
  { id: '1', content: 'This is a note', author: 'Adam Scott' },
  { id: '2', content: 'This is another note', author: 'Harlow Everly' },
  { id: '3', content: 'Oh hey look, another note!', author: 'Riley Harrison' }
];

// Construct the schema object

const typeDefs = gql`
  type Note {
    id: ID!
    content: String!
    author: String!
  }
  type Query {
    hello: String,
    notes: [Note!]!
    note(id: ID!): Note!
  }
  type Mutation {
    newNote(content: String!): Note!
  }
`;

// Construct a resolver function
const resolvers = {

  Query: {
    hello: () => 'Hello world!',
    notes: () => notes,
    note: (parent, args) => {
      return notes.find(note => note.id === args.id)
    }
  },
  Mutation: {
    newNote: (parent, args) => {
      let noteValue = {
        id: String(notes.length + 1),
        content: args.content,
        author: 'Adam Scott'
      }
      notes.push(noteValue)
      return noteValue
    }
  }
}

// Construnct the Apollo server
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/api' })

app.listen({ port }, () =>
  console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath}`)
)