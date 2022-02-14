import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';


const httpLink = createHttpLink({
    uri: 'https://swapi-graphql.netlify.app',
    fetchOptions: {
        mode: 'no-cors',
      }
  });

export const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
    connectToDevTools: true,
});
