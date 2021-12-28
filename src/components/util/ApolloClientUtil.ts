import { InMemoryCache } from '@apollo/client';
import { ApolloLink } from '@apollo/client';
import { ApolloClient } from '@apollo/client';
import { createHttpLink } from '@apollo/client';

const httpLink = createHttpLink({
  uri: "http://localhost:8080/graphql", // TODO config化
  credentials: 'include'
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache()
});
