import { gql } from "@apollo/client";

export default gql`
  query MyOrders($limit: Int, $page: Int) {
    myOrders(limit: $limit, page: $page) {
      count
      myOrders {
        id
        product {
          name
          photo
          description
          price
        }
      }
    }
  }
`;
