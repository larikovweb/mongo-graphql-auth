import { gql } from 'apollo-server-express';

// Определения типов для User
const userTypeDefs = gql`
  type User {
    id: ID!
    email: String!
    isActivated: Boolean!
  }

  type Token {
    refreshToken: String!
    accessToken: String!
  }

  type AuthPayload {
    accessToken: String!
    refreshToken: String!
    user: User!
  }

  type Mutation {
    registration(email: String!, password: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!
    logout: Boolean
    refresh: Token
    activate(activationLink: String!): User
  }

  type Query {
    allUsers: [User!]!
  }
`;

export default userTypeDefs;
