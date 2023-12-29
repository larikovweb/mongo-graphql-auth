// src/apollo/client.ts
import { ApolloClient, InMemoryCache, HttpLink, ReactiveVar, makeVar } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { IAuthResponse } from '../interfaces/data';

export const currentUserVar: ReactiveVar<IAuthResponse | null> = makeVar<IAuthResponse | null>(
  null,
);

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
  credentials: 'include',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  console.log(token, 'token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  //   link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
});
