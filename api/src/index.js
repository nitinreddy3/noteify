// index.js
// This is the main entry point of our application

const express = require('express');
const app = express()
const { ApolloServer, gql } = require('apollo-server-express')
const port = process.env.PORT || 4000

// Construct the schema object
const typeDefs = gql`
  type Query {
    hello: String,
    firstName: String
  }
`;

// Construct a resolver function
const resolvers = {
  Query: {
    hello: () => 'Hello world!',
    firstName: () => 'Nitin Reddy'
  }
}

// Construnct the Apollo server
const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app, path: '/api' })

app.listen({ port }, () =>
  console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath}`)
)