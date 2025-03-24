import { gql } from "@apollo/client";

export default gql`
  query MyOffers($page: Int, $limit: Int) {
    myOffers(page: $page, limit: $limit) {
      myOffers {
        message
        price
        id
        product {
          name
          photo
          price
        }
        user {
          name
        }
      }
      count
    }
  }
`;
