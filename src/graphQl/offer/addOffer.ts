import { gql } from "@apollo/client";

export default gql`
  mutation AddOffer($offer: AddOffer!) {
    addOffer(offer: $offer) {
      price
      user {
        name
      }
    }
  }
`;
