import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation SignUp(
    $email: String!
    $username: String!
    $name: String!
    $password: String!
  ) {
    signUp(
      email: $email
      username: $username
      name: $name
      password: $password
    ) {
      id
    }
  }
`;
