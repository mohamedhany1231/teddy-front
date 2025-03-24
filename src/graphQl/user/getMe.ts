import { gql } from "@apollo/client";

export default gql`
  query ExampleQuery {
    me {
      id
      name
      email
      role
      created_at
      updated_at
    }
  }
`;
