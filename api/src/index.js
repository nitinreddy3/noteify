// index.js
// This is the main entry point of our application

const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express')
const port = process.env.PORT || 4000
require('dotenv').config();
const db = require('./db')

const DB_HOST = process.env.DB_HOST;

const models = require('./models');

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
    notes: async () => {
      return await models.Note.find()
    },
    note: async (parent, args) => {
      return await models.Note.findById(args.id)
    }
  },
  Mutation: {
    newNote: async (parent, args) => {
      return await models.Note.create({
        content: args.content,
        author: 'Nitin'
      })
    }
  }
}

const app = express()

db.connect(DB_HOST);

// Construnct the Apollo server
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/api' })

app.listen({ port }, () =>
  console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath}`)
)