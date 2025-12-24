import { gql } from "@apollo/client";

export const GET_FABRIC_PRICE_QUERY = gql`
  query GetFabricPrice($input: getFabricPriceInput!) {
    fabricPrice(input: $input) {
      UID
      FabricID
      SellPrice
      Tax_amount
      TotalSalesAmt
      TradeType
      TaxPercentage
    }
  }
`;
