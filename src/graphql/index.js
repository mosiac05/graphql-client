import { split, HttpLink, ApolloClient, InMemoryCache } from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { setContext } from '@apollo/client/link/context';

const token = "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJzdHVkeTRhIiwiZXhwIjoxNzAyNzU4MTAwLCJpYXQiOjE3MDAxNjYxMDAsImlzcyI6InN0dWR5NGEiLCJqdGkiOiIyZGEwNGMzNS0yNTA0LTQ2MTMtODg4ZS0yOWViODYzODFlNTUiLCJuYmYiOjE3MDAxNjYwOTksInN1YiI6IjIiLCJ0eXAiOiJhY2Nlc3MifQ.b1lafEIx1ULm2uJeu2zhGKfWqREwVJKhMjdirgP_ZkdzSk8e9Nv3-eh7wiq6TTOOFyC87KmsrE8GkcwQCExkkA"

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/api'
});

// Use setContext to create a chainable link object that sets
// the token cookie to the Authorization header.
const authLink = setContext((_, { headers }) => {
  // Add the new Authorization header.
  return {
    headers: {
      ...headers,
      Authorization: token
    }
  };
});

// Chain the HTTP link and the authorization link.
const authedHttpLink = authLink.concat(httpLink);

const wsLink = new GraphQLWsLink(createClient({
  url: 'ws://localhost:4000/subscriptions',
  connectionParams: {
    Authorization: token,
  },
}));

// The split function takes three parameters:
//
// * A function that's called for each operation to execute
// * The Link to use for an operation if the function returns a "truthy" value
// * The Link to use for an operation if the function returns a "falsy" value
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  authedHttpLink,
);


const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache()
});

export default client;
