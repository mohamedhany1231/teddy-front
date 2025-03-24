import { gql } from "@apollo/client";

export default gql`
  query ExampleQuery($productId: ID!) {
    product(id: $productId) {
      created_at
      description
      id
      name
      price
      updated_at
      photo
      seller {
        name
        id
        products {
          id
          name
          price
        }
      }
    }
  }
`;
