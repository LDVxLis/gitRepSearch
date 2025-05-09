import { ApolloClient, InMemoryCache } from "@apollo/client";

export const apolloClient = new ApolloClient({
  uri: "https://api.github.com/graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});
