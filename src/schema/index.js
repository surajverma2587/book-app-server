const { gql } = require("apollo-server");

const typeDefs = gql`
  type Book {
    bookId: String!
    authors: [String]
    description: String!
    title: String!
    image: String
    link: String
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    bookCount: Int
    savedBooks: [Book]
  }

  type Auth {
    token: ID
    user: User
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input AddUserInput {
    username: String!
    email: String!
    password: String!
  }

  input SaveBookInput {
    authors: [String]
    title: String!
    bookId: String!
    description: String!
    image: String
    link: String
  }

  input RemoveBookInput {
    bookId: String!
  }

  type Query {
    me: User!
  }

  type Mutation {
    login(input: LoginInput!): Auth!
    addUser(input: AddUserInput!): Auth!
    saveBook(input: SaveBookInput!): User!
    removeBook(input: RemoveBookInput!): User!
  }
`;

module.exports = typeDefs;
