import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import http from 'http';
import cors from 'cors';
import mongoose from 'mongoose';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import cookieParser from 'cookie-parser';

// MongoDB connection function
async function connectToMongoDB() {
  const mongoDBUri = 'mongodb://localhost:27017/graphql';
  try {
    await mongoose.connect(mongoDBUri);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Could not connect to MongoDB', error);
    process.exit(1);
  }
}

async function startApolloServer() {
  // Connect to MongoDB before starting the Apollo Server
  await connectToMongoDB();

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    }),
  );

  app.use(cookieParser());
  app.use(express.json());
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ authorization: req.headers.authorization, req, res }),
    }),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);
}

startApolloServer().catch((error) => {
  console.error('Failed to start the server', error);
});
