import { InMemoryCache } from '@apollo/client';
import { ApolloLink } from '@apollo/client';
import { ApolloClient } from '@apollo/client';
import { createHttpLink } from '@apollo/client';
import getConfig from "next/config";
const { publicRuntimeConfig }= getConfig();

const httpLink = createHttpLink({
  uri: `${publicRuntimeConfig.NEXT_PUBLIC_API_SERVER}${process.env.NEXT_PUBLIC_API_GRAPHQL}`,
  credentials: 'include'
});

export const apolloClient = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache()
});
