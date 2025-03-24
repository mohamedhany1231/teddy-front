import { gql } from "@apollo/client";

export default gql`
  mutation ConfirmOrder($confirmOrderId: String!, $productId: String!) {
    confirmOrder(id: $confirmOrderId, productId: $productId) {
      message
      success
    }
  }
`;
