import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import {
    ApolloServerPluginLandingPageGraphQLPlayground
} from "apollo-server-core";
import { graphqlUploadExpress } from 'graphql-upload';
import mongoose from 'mongoose';
import typeDefs from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers.js';

async function initServer() {
    dotenv.config();
    const port = process.env.PORT || 5000;
    const mongodb = process.env.MONGO;
    const app = express();
    const __dirname = path.resolve();
    const apolloServer = new ApolloServer({ 
        typeDefs, 
        resolvers,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
     });
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


    app.use(express.static(path.join(__dirname, '../client/build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/build/index.html'));
    });
    
}

initServer();
