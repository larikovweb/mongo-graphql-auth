import { useQuery } from '@apollo/client';
import { GET_USERS_QUERY } from '../graphql/queries/userQueries';
import { FC } from 'react';

export const UserList: FC = () => {
  const { loading, error, data } = useQuery(GET_USERS_QUERY);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <ul>
      {data.users.map((user: any) => (
        <li key={user.id}>{user.email}</li>
      ))}
    </ul>
  );
};
