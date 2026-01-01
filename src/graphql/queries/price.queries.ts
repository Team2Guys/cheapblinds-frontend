import { gql } from "@apollo/client";

export const GET_FABRIC_PRICE_QUERY = gql`
  query GetFabricPrice($input: getPricingInput!) {
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

export const GET_OPTIONS_PRICE_QUERY = gql`
  query GetOptionsPrice($input: getPricingInput!) {
    optionsPrice(input: $input) {
      UID
      Blindtypeid
      BlindTypeDescription
      OptionGroup_ID
      OptionGroup
      ChoiceCode
      ChoiceDescription
      ChoiceID
      SalesPrice
    }
  }
`;
