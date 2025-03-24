import { gql } from "@apollo/client";

export default gql`
  mutation Login($user: Login!) {
    login(user: $user) {
      token
    }
  }
`;
