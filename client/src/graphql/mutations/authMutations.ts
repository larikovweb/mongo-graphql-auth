import { gql } from '@apollo/client';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    authRes: login(email: $email, password: $password) {
      user {
        id
        email
        isActivated
      }
      accessToken
    }
  }
`;

const REGISTRATION_MUTATION = gql`
  mutation Registration($email: String!, $password: String!) {
    authRes: registration(email: $email, password: $password) {
      user {
        id
        email
        isActivated
      }
      accessToken
    }
  }
`;

const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

const REFRESH_MUTATION = gql`
  mutation Refresh {
    authRes: refresh {
      user {
        id
        email
        isActivated
      }
      accessToken
    }
  }
`;

export { LOGIN_MUTATION, REGISTRATION_MUTATION, LOGOUT_MUTATION, REFRESH_MUTATION };
