import { gql } from "@apollo/client";

export default gql`
  mutation AddProduct($product: AddProduct!) {
    addProduct(product: $product) {
      id
    }
  }
`;
