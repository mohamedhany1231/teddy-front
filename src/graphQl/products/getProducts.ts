import { gql } from "@apollo/client";

export default gql`
  query Products(
    $orderBy: ProductSort
    $page: Int
    $limit: Int
    $order: SortOrder
    $search: String
  ) {
    products(
      orderBy: $orderBy
      page: $page
      limit: $limit
      order: $order
      search: $search
    ) {
      products {
        created_at
        description
        id
        name
        price
        photo
        seller {
          name
          id
        }
        updated_at
      }
      count
    }
  }
`;
