import { useQuery } from '@apollo/client';
import { GET_USERS_QUERY } from '../graphql/queries/userQueries';
import { IUser } from '../interfaces/data';

export const UserList = () => {
  const { loading, error, data } = useQuery(GET_USERS_QUERY);
  console.log(data);

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
