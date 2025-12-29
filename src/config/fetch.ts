import { DocumentNode } from "@apollo/client";
import ApolloCustomClient from "@utils/apollo-client";
import {
  ADDRESS_LIST_BY_USER_QUERY,
  GET_CATEGORY_BY_SLUG_QUERY,
  GET_CATEGORY_LIST_QUERY,
  GET_NEWSLETTER_SUBSCRIBER_BY_EMAIL_QUERY,
  GET_ORDER_BY_ID_QUERY,
  GET_ORDERS_BY_USER_ID_QUERY,
  GET_PRODUCT_BY_SLUG_QUERY,
  GET_PRODUCT_LIST_QUERY,
  GET_SUBCATEGORY_BY_URLS_QUERY,
  GET_USER_BY_ID_QUERY,
} from "@graphql";
import {
  addressProps,
  Category,
  FabricPrice,
  GetPricingInput,
  NewsletterProps,
  OptionsPrice,
  Orders,
  Product,
  Subcategory,
  UserProps,
} from "@/types/category";
import { GET_FABRIC_PRICE_QUERY, GET_OPTIONS_PRICE_QUERY } from "@graphql/queries/price.queries";

export const fetchCategories = async (FETCH_CATEGORY?: DocumentNode) => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: FETCH_CATEGORY ? FETCH_CATEGORY : GET_CATEGORY_LIST_QUERY,
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["categoryList"] } },
      },
    });

    return data?.categoryList || [];
  } catch (error) {
    return [];
    throw error;
  }
};

export const fetchSingleCategory = async (
  slug: string,
  FIND_ONE_CUSTOM_QUERY?: DocumentNode,
): Promise<Category | null> => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: FIND_ONE_CUSTOM_QUERY || GET_CATEGORY_BY_SLUG_QUERY,
      variables: { slug },
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["categories"] } },
      },
    });

    return data?.categoryBySlug ?? null;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
};

export const fetchSingleSubCategory = async (
  subcategorySlug: string,
  categorySlug: string,
  FIND_ONE_CUSTOM_QUERY?: DocumentNode,
): Promise<Subcategory | null> => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: FIND_ONE_CUSTOM_QUERY ?? GET_SUBCATEGORY_BY_URLS_QUERY,
      variables: {
        subcategorySlug,
        categorySlug,
      },
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["subcategories"] } },
      },
    });

    return data?.subcategoryBySlugs ?? null;
  } catch (error: unknown) {
    console.error("Error fetching subcategory:", error);
    return null;
  }
};

export const fetchProducts = async (FETCH_PRODUCT?: DocumentNode): Promise<Product[]> => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: FETCH_PRODUCT ? FETCH_PRODUCT : GET_PRODUCT_LIST_QUERY,
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: {
          next: { tags: ["productList"] },
        },
      },
    });

    // 1. Verify data exists
    if (data && data.productList) {
      return data.productList; // <--- THIS IS THE CRITICAL LINE
    }

    return [];
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const fetchSingleProduct = async (
  categorySlug: string,
  subcategorySlug: string,
  productSlug: string,
  FIND_ONE_CUSTOM_QUERY?: DocumentNode,
): Promise<Product | null> => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: FIND_ONE_CUSTOM_QUERY ? FIND_ONE_CUSTOM_QUERY : GET_PRODUCT_BY_SLUG_QUERY,
      variables: {
        categorySlug,
        subcategorySlug,
        productSlug,
      },
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["products"] } },
      },
    });

    return data?.productBySlugs ?? null;
  } catch (error: unknown) {
    console.error("Error fetching product:", error);
    return null;
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


export const fetchOrdersByUserId = async (
  id: string,
  CUSTOM_QUERY?: DocumentNode,
): Promise<Orders[] | null> => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: CUSTOM_QUERY || GET_ORDERS_BY_USER_ID_QUERY,
      variables: { id: id },
      fetchPolicy: "no-cache",
      context: { fetchOptions: { next: { tags: ["orders"] } } },
    });

    return data?.orderListByUserId ?? null;
  } catch (error) {
    console.error("Error fetching orders by user ID:", error);
    return null;
  }
};

export const fetchSingleOrder = async (
  id: string,
  CUSTOM_QUERY?: DocumentNode,
): Promise<Orders | null> => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: CUSTOM_QUERY || GET_ORDER_BY_ID_QUERY,
      variables: { id: id },
      fetchPolicy: "no-cache",
      context: { fetchOptions: { next: { tags: ["orders"] } } },
    });

    return data?.orderById ?? null;
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    return null;
  }
};

export const fetchAddressListByUser = async (
  userId: string,
  CUSTOM_QUERY?: DocumentNode,
): Promise<addressProps[] | null> => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: CUSTOM_QUERY || ADDRESS_LIST_BY_USER_QUERY,
      variables: { userId },
      fetchPolicy: "no-cache",
      context: { fetchOptions: { next: { tags: ["address-list"] } } },
    });

    return data?.addressListByUserId ?? null;
  } catch (error) {
    console.error("Error fetching address list by user:", error);
    return null;
  }
};

export const fetchNewsletterByEmail = async (
  email: string,
  CUSTOM_QUERY?: DocumentNode,
): Promise<NewsletterProps | null> => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: CUSTOM_QUERY || GET_NEWSLETTER_SUBSCRIBER_BY_EMAIL_QUERY,
      variables: { email },
      fetchPolicy: "no-cache",
      context: { fetchOptions: { next: { tags: ["newsletter"] } } },
    });

    return data?.newsletterSubscriberByEmail ?? null;
  } catch (error) {
    console.error("Error fetching address list by user:", error);
    return null;
  }
};

export const fetchUserById = async (
  id: string,
  CUSTOM_QUERY?: DocumentNode,
): Promise<UserProps | null> => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: CUSTOM_QUERY || GET_USER_BY_ID_QUERY,
      variables: { id },
      fetchPolicy: "no-cache",
      context: { fetchOptions: { next: { tags: ["userList"] } } },
    });

    return data?.userById ?? null;
  } catch (error) {
    console.error("Error fetching address list by user:", error);
    return null;
  }
};
