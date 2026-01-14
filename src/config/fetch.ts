import { DocumentNode } from "@apollo/client";
import ApolloCustomClient from "@utils/apollo-client";
import { FabricPrice, GetPricingInput, OptionsPrice } from "@/types/category";
import { GET_FABRIC_PRICE_QUERY, GET_OPTIONS_PRICE_QUERY } from "@graphql/queries/price.queries";

export const queryData = async <T>(
  query: DocumentNode,
  queryName: string,
  variables?: { [key: string]: string | number },
): Promise<T> => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: query,
      variables: variables,
      fetchPolicy: "no-cache",
      context: {
        caches: "no-cache",
        fetchOptions: { next: { tags: ["apiRequest"] } },
      },
    });

    return data?.[queryName];
  } catch (error) {
    throw error;
  }
};

export const fetchFabricPrice = async (
  input: GetPricingInput,
  CUSTOM_QUERY?: DocumentNode,
): Promise<FabricPrice | null> => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: CUSTOM_QUERY ?? GET_FABRIC_PRICE_QUERY,
      variables: {
        input,
      },
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["fabric-price"] } },
      },
    });

    return data?.fabricPrice ?? null;
  } catch (error: unknown) {
    console.error("Error fetching fabric price:", error);
    return null;
  }
};

export const fetchOptionsPrice = async (
  input: GetPricingInput,
  CUSTOM_QUERY?: DocumentNode,
): Promise<OptionsPrice[] | null> => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: CUSTOM_QUERY ?? GET_OPTIONS_PRICE_QUERY,
      variables: {
        input,
      },
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["options-price"] } },
      },
    });

    return data?.optionsPrice ?? null;
  } catch (error: unknown) {
    console.error("Error fetching options price:", error);
    return null;
  }
};
