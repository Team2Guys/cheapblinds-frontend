'use server';

import { APPOINTMENTS_ORDERS, GET_ALL_PROD_REVIEWS, GET_ALL_PRODUCT_QUESTIONS, WEEKLY_STATS } from "graphql/general";
import { FIND_ONE_REDIRECT_URL } from "graphql/mutations";
import { FETCH_ALL_ECOMMERCE_PAGINATED_PRODUCTS, FIND_ONE_USER_ORDER, GET_Redirecturls, GET_REVIEWS, ORDER_QUERY } from "graphql/queries";
import { fetchAllblogs, GET_ALL_BLOGS } from "graphql/blogs";
import { GET_ALL_JOB_APPLICATIONS, GET_ALL_JOBS, GET_SINGLE_JOB } from "graphql/JobsModule";
import ApoloClient from "utils/AppoloClient";
import { DocumentNode } from "@apollo/client";




export const fetchRedirectUrls = async (FIND_QUICK_VIEW_PRODUCT?: DocumentNode) => {
  try {
    const { data } = await ApoloClient.query({
      query: FIND_QUICK_VIEW_PRODUCT ? FIND_QUICK_VIEW_PRODUCT : GET_Redirecturls,

      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["RedirectUrls"] } },
      },

    });
    return data?.findAllRedirecturls;
  } catch (error) {
    return [];
    throw error;
  }
};

export const fetchReview = async (FIND_QUICK_VIEW_PRODUCT?: DocumentNode) => {
  try {
    const { data } = await ApoloClient.query({
      query: FIND_QUICK_VIEW_PRODUCT ? FIND_QUICK_VIEW_PRODUCT : GET_REVIEWS,

      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["reviews"] } },
      },

    });
    return data?.get_All_Reviews;
  } catch (error) {
    return [];
    throw error;
  }
};


export const fetchPaginatedEcommerce = async (
  categoryname: string,
  page: number,
  pageSize: number,
  subcategory?: string
) => {
  try {
    const { data } = await ApoloClient.mutate({
      mutation: FETCH_ALL_ECOMMERCE_PAGINATED_PRODUCTS,
      variables: {
        PaginatedPrducts: {
          categoryname,
          page,
          pageSize,
          subcategory
        },
      },
      fetchPolicy: 'no-cache',
    });

    return data?.PaginatedPrducts || [];
  } catch (error) {
    return [];
    throw error;

  }
};


export const fetchUserOrders = async (email: string) => {
  try {
    const { data } = await ApoloClient.query({
      query: FIND_ONE_USER_ORDER,
      fetchPolicy: "no-cache",
      variables: {
        email: email
      },
      context: {
        // headers: {
        //   authorization: `Bearer ${token}`
        // },
        fetchOptions: {
          next: { tags: ["orders"] }
        },
      },
    });
    return data.usersOrders || [];
  } catch (error) {
    return []
    throw error;
  }
};

export const fetchSingleOrder = async (orderId: string) => {
  try {
    const { data } = await ApoloClient.query({
      query: ORDER_QUERY,
      fetchPolicy: "no-cache",
      variables: { orderId },
      context: {
        fetchOptions: {
          next: { tags: ["orders"] }
        },
      },
    });
    return data.Order || [];
  } catch (error) {
    return []
    throw error;
  }
};



export const findOneRedirectUrl = async (
  url: string,
  token?:string,
  CUSTOM_MUTATION?: DocumentNode,
 
) => {
  try {
    const { data } = await ApoloClient.mutate({
      mutation: CUSTOM_MUTATION ? CUSTOM_MUTATION : FIND_ONE_REDIRECT_URL,
      variables: { url },
      context: {
            headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
        fetchOptions: {
          credentials: 'include',
          next: { tags: ["RedirectUrls"] }
          
        },
      },
    });

    return data?.findOneRedirecturls || null;
  } catch {
    return [];
    throw null;
  }
};


// prodquestions
export const fetchProductQuestions = async (FIND_QUICK_VIEW_PRODUCT_REVIEW?: DocumentNode, token?:string) => {
  try {
    const { data } = await ApoloClient.query({
      query: FIND_QUICK_VIEW_PRODUCT_REVIEW ? FIND_QUICK_VIEW_PRODUCT_REVIEW : GET_ALL_PRODUCT_QUESTIONS,

      fetchPolicy: "no-cache",
      context: {
            headers: {
          authorization: token ? `Bearer ${token}` : '',
        },
        fetchOptions: { next: { tags: ["prodQuestions","Ecomerece"] } },
      },

    })
    return data?.get_All_prod_Questions;
  } catch (error) {
    return [];
    throw error;
  }
};



export const fetchProductreviews = async (FIND_QUICK_VIEW_PRODUCT_REVIEW?: DocumentNode) => {
  try {
    const { data } = await ApoloClient.query({
      query: FIND_QUICK_VIEW_PRODUCT_REVIEW ? FIND_QUICK_VIEW_PRODUCT_REVIEW : GET_ALL_PROD_REVIEWS,

      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["prodreviews"] } },
      },

    });
    return data?.get_All_prod_Reviews;
  } catch (error) {
    return[];
    throw error;
  }
};


export const fetchAllBlogs = async (FIND_QUICK_VIEW_PRODUCT_REVIEW?: DocumentNode) => {
  try {
    const { data } = await ApoloClient.query({
      query: FIND_QUICK_VIEW_PRODUCT_REVIEW ? FIND_QUICK_VIEW_PRODUCT_REVIEW : GET_ALL_BLOGS,

      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["blogs"] } },
      },

    });
    return data?.get_all_blogs;
  } catch (error) {
    return [];
    throw error;
  }
};


export const fetchSingleComment = async (FIND_ONE_CUSTOM_BLOG?: DocumentNode) => {
  try {
    const { data } = await ApoloClient.query({
      query: FIND_ONE_CUSTOM_BLOG ? FIND_ONE_CUSTOM_BLOG : fetchAllblogs,
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["blogs"] } },
      },

    });
    return data?.Allcoments;
  } catch (error) {
    return [];
    throw error;
  }
};

// JObs

export const fetchJobs = async (FIND_QUICK_VIEW_PRODUCT_REVIEW?: DocumentNode) => {
  try {
    const { data } = await ApoloClient.query({
      query: FIND_QUICK_VIEW_PRODUCT_REVIEW ? FIND_QUICK_VIEW_PRODUCT_REVIEW : GET_ALL_JOBS,

      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["Jobs"] } },
      },

    });
    return data?.get_All_jobs;
  } catch (error) {
    return [];
    throw error;
  }
};

//single job
export const fetchSingleJobs = async (customUrl: string, FIND_QUICK_VIEW_PRODUCT_REVIEW?: DocumentNode) => {
  try {
    const { data } = await ApoloClient.query({
      query: FIND_QUICK_VIEW_PRODUCT_REVIEW ? FIND_QUICK_VIEW_PRODUCT_REVIEW : GET_SINGLE_JOB,
      variables: { customUrl },
      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["Jobs"] } },
      },

    });
    return data?.get_single_job;
  } catch (error) {
    return [];
    throw error;
  }
};

export const fetchJobsApplication = async (FIND_QUICK_VIEW_PRODUCT_REVIEW?: DocumentNode) => {
  try {
    const { data } = await ApoloClient.query({
      query: FIND_QUICK_VIEW_PRODUCT_REVIEW ? FIND_QUICK_VIEW_PRODUCT_REVIEW : GET_ALL_JOB_APPLICATIONS,

      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["JobApplication"] } },
      },
    });
    return data?.get_All_jobs_applications;
  } catch (error) {
    return [];
    throw error;
  }
};


export const MONTHLYSTATS_HANDLER = async (token?:string ,FIND_QUICK_VIEW_PRODUCT_REVIEW?: DocumentNode, ) => {
  try {

    const { data } = await ApoloClient.query({
      query: FIND_QUICK_VIEW_PRODUCT_REVIEW ? FIND_QUICK_VIEW_PRODUCT_REVIEW : APPOINTMENTS_ORDERS,

      fetchPolicy: "no-cache",
      context: {
            headers: {
          authorization: `Bearer ${token}`
        },
       fetchOptions: {
      next: { tags: ["orders","Ecomerece","appointments"] }
        },
      },
    });
    return data?.MONTHLY_COUNT;
  } catch (error) {
    return [];
    throw error;
  }
};


export const WEEEKLYSTATSHANDLER = async (token?:string ,FIND_QUICK_VIEW_PRODUCT_REVIEW?: DocumentNode) => {
  try {
      // const token  = await getToken()
    const { data } = await ApoloClient.query({
      query: FIND_QUICK_VIEW_PRODUCT_REVIEW ? FIND_QUICK_VIEW_PRODUCT_REVIEW : WEEKLY_STATS,

      fetchPolicy: "no-cache",
      context: {
            headers: {
          authorization: `Bearer ${token}`
        },
       fetchOptions: {
          next: { tags: ["orders","Ecomerece","appointments"] }
        },
      },
    });
    return data?.WEEKLY_STATS;
  } catch (error) {
    console.log(error, "error")
    return [];
    throw error;
  }
};



