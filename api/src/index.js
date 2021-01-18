// index.js
// This is the main entry point of our application

const express = require('express');
const { ApolloServer } = require('apollo-server-express')
const port = process.env.PORT || 4000
require('dotenv').config();
const db = require('./db')

const DB_HOST = process.env.DB_HOST;

const models = require('./models');
const resolvers = require('./resolvers');
const typeDefs = require('./schema');

const app = express()

db.connect(DB_HOST);

// Construnct the Apollo server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => {
    return { models }
  }
});

server.applyMiddleware({ app, path: '/api' })

app.listen({ port }, () =>
  console.log(`GraphQL server running at http://localhost:${port}${server.graphqlPath}`)
)