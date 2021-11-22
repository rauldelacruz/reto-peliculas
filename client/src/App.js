import React from 'react';
import './App.css';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { createUploadLink } from 'apollo-upload-client'
import { AppRouter } from './routers/AppRouter';
import { NotificationProvider } from './context/NotificationContext';

const client = new ApolloClient({
  cache: new InMemoryCache({
    addTypename: false
  }),
  link: createUploadLink({
    uri: "/graphql",
  }),
});

const App = () => {
  return (
    <NotificationProvider>
       <ApolloProvider client={ client }>
        <AppRouter />
      </ApolloProvider>
    </NotificationProvider> 
  );
}

export default App;
