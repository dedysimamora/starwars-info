import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { cache } from './cache';


const httpLink = new HttpLink({
    uri: 'https://swapi-graphql.netlify.app/.netlify/functions/index'
  });


export const client = new ApolloClient({
    cache: cache,
    link: httpLink
});
