import { DocumentNode } from "@apollo/client";
import { Category } from "@/types/cat";
import ApolloCustomClient from "@utils/apollo-client";
import {
  GET_ALL_ADMINS,
  GET_CATEGORY_BY_SLUG,
  GET_CATEGORY_LIST,
  GET_PRODUCT_BY_URLS,
  GET_PRODUCT_LIST,
  GET_SUBCATEGORY_BY_URLS,
  GET_SUBCATEGORY_LIST,
} from "@graphql";
import { Product, Subcategory } from "@/types/category";

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

    return data?.getAdminList || [];
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

    return data?.getCategoryList || [];
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

    return data?.getCategoryBySlug ?? null;
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

    return data?.getSubcategoryBySlugs ?? null;
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

    return data?.getSubcategoryList || [];
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

    return data.getProductList || [];
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
      query: FIND_ONE_CUSTOM_QUERY ? FIND_ONE_CUSTOM_QUERY : GET_PRODUCT_BY_URLS,
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

    return data?.getProductBySlugs ?? null;
  } catch (error: unknown) {
    console.error("Error fetching product:", error);
    return null;
  }
};
