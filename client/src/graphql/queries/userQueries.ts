import { gql } from '@apollo/client';

const GET_USERS_QUERY = gql`
  query AllUsers {
    users: allUsers {
      id
      email
      isActivated
    }
  }
`;

export { GET_USERS_QUERY };
