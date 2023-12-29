import { gql } from 'apollo-server-express';

const tokenTypeDefs = gql`
  type Token {
    id: ID!
    user: User!
    refreshToken: String!
    accessToken: String!
  }

  extend type Query {
    findToken(refreshToken: String!): Token
  }

  extend type Mutation {
    generateTokens(userId: ID!): Token
    removeToken(refreshToken: String!): Boolean
  }
`;

export default tokenTypeDefs;
