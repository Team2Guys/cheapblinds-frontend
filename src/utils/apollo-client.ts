import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const ApolloCustomClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_BASE_URL,
    credentials: 'include',
  }),
  cache: new InMemoryCache(),
});

export default ApolloCustomClient;