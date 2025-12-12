import { DocumentNode } from "@apollo/client";
import { Category } from "@/types/cat";
import ApolloCustomClient from "@utils/apollo-client";
import {
  ADDRESS_LIST_BY_USER,
  GET_ALL_ADMINS,
  GET_CATEGORY_BY_SLUG,
  GET_CATEGORY_LIST,
  GET_NEWSLETTER_SUBSCRIBER_BY_EMAIL,
  GET_ORDER_BY_ID,
  GET_ORDER_LIST,
  GET_ORDERS_BY_USER_ID,
  GET_PRODUCT_BY_SLUG,
  GET_PRODUCT_LIST,
  GET_SUBCATEGORY_BY_URLS,
  GET_SUBCATEGORY_LIST,
  GET_USER_BY_ID,
} from "@graphql";
import { addressProps, NewsletterProps, Orders, Product, Subcategory, UserProps } from "@/types/category";

// _____________________ NEW Mutation ----------------------------

export const getAllAdmins = async () => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: GET_ALL_ADMINS,
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["Admins"] } },
      },
    });

    return data?.adminList || [];
  } catch (error) {
    return [];
    throw error;
  }
};

export const fetchCategories = async (FETCH_CATEGORY?: DocumentNode) => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: FETCH_CATEGORY ? FETCH_CATEGORY : GET_CATEGORY_LIST,
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["categories"] } },
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
      query: FIND_ONE_CUSTOM_QUERY || GET_CATEGORY_BY_SLUG,
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
      query: FIND_ONE_CUSTOM_QUERY ?? GET_SUBCATEGORY_BY_URLS,
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

export const fetchSubCategories = async () => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: GET_SUBCATEGORY_LIST,
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["subcategories"] } },
      },
    });

    return data?.subcategoryList || [];
  } catch (error) {
    return [];
    throw error;
  }
};

export const fetchProducts = async (FETCH_PRODUCT?: DocumentNode) => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: FETCH_PRODUCT ? FETCH_PRODUCT : GET_PRODUCT_LIST,
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: {
          next: { tags: ["products"] },
        },
      },
    });

    return data.productList || [];
  } catch (error) {
    return [];
    throw error;
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
      query: FIND_ONE_CUSTOM_QUERY ? FIND_ONE_CUSTOM_QUERY : GET_PRODUCT_BY_SLUG,
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

export const fetchOrderList = async (CUSTOM_QUERY?: DocumentNode): Promise<Orders[] | null> => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: CUSTOM_QUERY || GET_ORDER_LIST,
      fetchPolicy: "no-cache",
      context: { fetchOptions: { next: { tags: ["orders"] } } },
    });

    return data?.orderList ?? null;
  } catch (error) {
    console.error("Error fetching order list:", error);
    return null;
  }
};

export const fetchOrdersByUserId = async (
  id: string,
  CUSTOM_QUERY?: DocumentNode,
): Promise<Orders[] | null> => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: CUSTOM_QUERY || GET_ORDERS_BY_USER_ID,
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
      query: CUSTOM_QUERY || GET_ORDER_BY_ID,
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
  CUSTOM_QUERY?: DocumentNode
): Promise<addressProps[] | null> => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: CUSTOM_QUERY || ADDRESS_LIST_BY_USER,
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
  CUSTOM_QUERY?: DocumentNode
): Promise<NewsletterProps | null> => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: CUSTOM_QUERY || GET_NEWSLETTER_SUBSCRIBER_BY_EMAIL,
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
  CUSTOM_QUERY?: DocumentNode
): Promise<UserProps | null> => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: CUSTOM_QUERY || GET_USER_BY_ID,
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
