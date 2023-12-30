import ReactDOM from 'react-dom/client';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from './graphql/apolloClient';
import Application from './app/Application';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ApolloProvider client={apolloClient}>
    <Application />
  </ApolloProvider>,
);
