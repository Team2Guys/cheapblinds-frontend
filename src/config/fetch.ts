import {
  FETCH_ALL_APPOINTMENTS,
  FETCH_ALL_INNER_SUB_CATEGORIES,
  FETCH_ALL_ORDERS,
  FIND_ONE_CATEGORY,
  FIND_ONE_PRODUCT,
  FIND_ONE_SUB_CATEGORY,
  GET_ALL_ADMINS,
  GET_ALL_RECORDS,
} from "graphql/queries";

import { DocumentNode } from "@apollo/client";
import { FETCH_ALL_ECOMERECE, FIND_ONE_Accessory } from "graphql/Accessories";
import { Category } from "types/cat";
// import { getToken } from 'components/ServerActons/ServerAction';
import ApoloClient from "utils/AppoloClient";
import { GET_ALL_CATEGORIES, GET_ALL_SUBCATEGORIES } from "graphql/categories";
import { GET_ALL_PRODUCTS } from "graphql/prod";

export const fetchProducts = async (CUSTOMIZE_QUERY?: DocumentNode) => {
  try {
    const { data } = await ApoloClient.query({
      query: CUSTOMIZE_QUERY ? CUSTOMIZE_QUERY : GET_ALL_PRODUCTS,
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: {
          next: { tags: ["products"] },
        },
      },
    });

    return data.products || [];
  } catch (error) {
    return [];
    // console.log(error.networkError.result.errors[0])
    throw error;
  }
};

export const fetchCategories = async (FETCH_HEADER_CATEGORIES?: DocumentNode) => {
  try {
    const { data } = await ApoloClient.query({
      query: FETCH_HEADER_CATEGORIES ? FETCH_HEADER_CATEGORIES : GET_ALL_CATEGORIES,
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["categories"] } },
      },
    });

    return data?.categories || [];
  } catch (error) {
    return [];
    throw error;
  }
};

export const fetchSubCategories = async (FETCHSUBCAT?: DocumentNode) => {
  try {
    const { data } = await ApoloClient.query({
      query: FETCHSUBCAT ? FETCHSUBCAT : GET_ALL_SUBCATEGORIES,
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["subcategories"] } },
      },
    });
    return data?.subCategories || [];
  } catch (error) {
    return [];
    throw error;
  }
};

export const fetchinnerSubCategories = async (FETCHSUBCAT?: DocumentNode) => {
  try {
    const { data } = await ApoloClient.query({
      query: FETCHSUBCAT ? FETCHSUBCAT : FETCH_ALL_INNER_SUB_CATEGORIES,
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["innerSubcategories"] } },
      },
    });

    return data?.Innersubcategories || [];
  } catch (error) {
    return [];
    throw error;
  }
};

export const fetchAppointments = async (token: string | undefined) => {
  try {
    const { data } = await ApoloClient.query({
      query: FETCH_ALL_APPOINTMENTS,
      fetchPolicy: "no-cache",
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
        fetchOptions: {
          next: { tags: ["appointments"] },
        },
      },
    });
    return data?.Get_Appointments || [];
  } catch (error) {
    return [];
    throw error;
  }
};

export const get_all_records = async () => {
  // const token  = await getToken()
  try {
    const { data } = await ApoloClient.query({
      query: GET_ALL_RECORDS,
      fetchPolicy: "no-cache",
      context: {
        // headers: {
        //   authorization: `Bearer ${token}`
        // },
        fetchOptions: {
          next: { tags: ["states_records"] },
        },
      },
    });
    return data?.GET_ALL_RECORDS;
  } catch (error) {
    return [];
    throw error;
  }
};

export const get_allAdmins = async (token: string | undefined) => {
  try {
    const { data } = await ApoloClient.query({
      query: GET_ALL_ADMINS,
      fetchPolicy: "no-cache",
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
        fetchOptions: {
          next: { tags: ["Admins"] },
        },
      },
    });
    return data?.admins || [];
  } catch (error) {
    return [];
    return error;
  }
};

export const fetchEcomereceProducts = async (CUSTOMISE_ACCESSORIES?: DocumentNode) => {
  try {
    const { data } = await ApoloClient.query({
      query: CUSTOMISE_ACCESSORIES ? CUSTOMISE_ACCESSORIES : FETCH_ALL_ECOMERECE,
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: {
          credentials: "include",
          next: { tags: ["Ecomerece"] },
        },
      },
    });

    return data?.eComerece || [];
  } catch (error) {
    return [];
    throw error;
  }
};

export const fetchSingleCategory = async (
  customUrl: string,
  FIND_ONE_CUSTOM_QUERY?: DocumentNode,
): Promise<Category | null> => {
  try {
    const { data } = await ApoloClient.query({
      query: FIND_ONE_CUSTOM_QUERY ? FIND_ONE_CUSTOM_QUERY : FIND_ONE_CATEGORY,
      variables: { customUrl },
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["categories"] } },
      },
    });
    return data?.category;
  } catch (error: unknown) {
    return null;
    throw error;
  }
};

export const fetchSingeSubCategory = async (
  custom_url: string,
  category: string,
  FIND_ONE_CUSTOM_QUERY?: DocumentNode,
) => {
  try {
    const { data } = await ApoloClient.query({
      query: FIND_ONE_CUSTOM_QUERY ? FIND_ONE_CUSTOM_QUERY : FIND_ONE_SUB_CATEGORY,
      variables: { custom_url, category },
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["subCategories"] } },
      },
    });
    return data?.find_one_subcategory;
  } catch (error) {
    return null;
    throw error;
  }
};

export const fetchSingeProduct = async (
  customUrl: string,
  category: string,
  subCategory: string,
  FIND_QUICK_VIEW_PRODUCT?: DocumentNode,
) => {
  try {
    const { data } = await ApoloClient.query({
      query: FIND_QUICK_VIEW_PRODUCT ? FIND_QUICK_VIEW_PRODUCT : FIND_ONE_PRODUCT,
      variables: { custom_url: customUrl, category, subCategory },
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["products", "Ecomerece"] } },
      },
    });
    return data?.single_product;
  } catch (error) {
    return null;
    throw error;
  }
};
export const fetchSingeEComProduct = async (
  customUrl: string,
  category: string,
  subCategory: string,
  FIND_QUICK_VIEW_PRODUCT?: DocumentNode,
) => {
  try {
    const { data } = await ApoloClient.query({
      query: FIND_QUICK_VIEW_PRODUCT ? FIND_QUICK_VIEW_PRODUCT : FIND_ONE_Accessory,
      variables: { custom_url: customUrl, category, subCategory },
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["Ecomerece"] } },
      },
    });
    return data?.single_product_ecomerece;
  } catch (error) {
    return [];
    throw error;
  }
};

export const fetchOrders = async (FETCH_ORDERS?: DocumentNode) => {
  try {
    const { data } = await ApoloClient.query({
      query: FETCH_ORDERS ? FETCH_ORDERS : FETCH_ALL_ORDERS,
      fetchPolicy: "no-cache",
      context: {
        // headers: {
        //   authorization: `Bearer ${token}`
        // },
        fetchOptions: {
          next: { tags: ["orders"] },
        },
      },
    });
    return data?.AllOrders || [];
  } catch (error) {
    return [];
    throw error;
  }
};
