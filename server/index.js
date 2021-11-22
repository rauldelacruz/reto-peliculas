import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { graphqlUploadExpress } from 'graphql-upload';
import mongoose from 'mongoose';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';

async function initServer() {
    dotenv.config();
    const port = process.env.PORT || 5000;
    const mongodb = process.env.MONGO;
    const app = express();
    const apolloServer = new ApolloServer({ typeDefs, resolvers });
    app.use(cors());
    app.use(graphqlUploadExpress());
    await apolloServer.start();

    apolloServer.applyMiddleware({ app });
    app.use((req, res) => {
        res.send('Server started successfully');
    })
    try {
        await mongoose.connect(mongodb);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
    }
    app.listen(port, () =>
        console.log('Server running on port ' + port));
    
}

initServer();
