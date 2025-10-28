"use server";

import { revalidateTag as revalidate } from "next/cache";
import {
  FIND_ONE_MAIN_CATEGORY_SEO,
  FIND_ONE_PRODUCT_META,
  FIND_ONE_SUB_CATEGORY_SEO,
  FIND_PRODUCT_META,
  GET_ADMIN_DATA,
} from "graphql/queries";
import { headers } from "next/headers";
import {
  fetchSingeEComProduct,
  fetchSingeProduct,
  fetchSingeSubCategory,
  fetchSingleCategory,
} from "config/fetch";
import { Metadata } from "next";
import { ISEO_TAGS, SEARCH_PARAMS } from "types/CommonTypes";
import ApoloClient from "utils/AppoloClient";
import { getServerSession } from "next-auth";
import { authOptions } from "components/auth/authOptions";

async function revalidateTag(name: string) {
  revalidate(name);
}

export default revalidateTag;

export const getAdminData = async () => {
  try {
    // const token =   await getToken()
    const { data } = await ApoloClient.query({
      query: GET_ADMIN_DATA,
      // context: {
      //   headers: {
      //     authorization: `Bearer ${token}`,
      //   },
      //   credentials: 'include',
      // },
      fetchPolicy: "no-cache",
    });

    return data?.admin || null;
  } catch (error) {
    return error;
  }
};

export const getfullUrls = async () => {
  const headersList = await headers();

  const domain = headersList.get("x-forwarded-host") || headersList.get("host") || "";
  const protocol = headersList.get("x-forwarded-proto") || "https";
  const pathname = headersList.get("x-invoke-path") || "/";
  const fullUrl = `${protocol}://${domain}${pathname}`;

  return fullUrl;
};
export const metaObjecthandler = async (category: ISEO_TAGS, search_params?: SEARCH_PARAMS) => {
  const fullUrl = await getfullUrls();

  const ImageUrl =
    category?.posterImageUrl?.imageUrl ||
    category?.posterImage?.imageUrl ||
    "/assets/images/header/logo.png";
  const alt = category?.posterImageUrl?.altText || category?.posterImage?.altText || "Two Guys";

  const NewImage = [{ url: ImageUrl, alt: alt }];
  const title = category?.Meta_Title || "Two Guys";
  const description = category?.Meta_Description || "Welcome to Two Guys";

  let url = fullUrl; // base: http://localhost:3000/

  if (category.category) {
    if (typeof category.category === "string") {
      url += `blogs/${category.category.toLowerCase()}/`;
    } else if (category.category.custom_url) {
      url += `${category.category.custom_url}/`;
    }
  }

  if (category.subcategory?.custom_url) {
    url += `${category.subcategory.custom_url}/`;
  }

  if (category?.custom_url) {
    url += `${category.custom_url}/`;
  }

  const { variant, size } = search_params ?? {};

  // Initialize queryParams array to collect query parameters
  const queryParams = [];

  if (variant) {
    queryParams.push(`variant=${variant}`);
  }

  if (size) {
    queryParams.push(`size=${size}`);
  }

  const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
  const fullurl = (url += queryString);

  return {
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      url: url,
      images: NewImage,
      type: "website",
    },
    alternates: {
      canonical:
        category?.Canonical_Tag && category?.Canonical_Tag !== ""
          ? `/${category?.Canonical_Tag}/`
          : fullurl,
    },
  };
};

export const SEO_TAGS_HANDLER = async (categoryName: string): Promise<Metadata | null> => {
  const category = await fetchSingleCategory(categoryName, FIND_ONE_MAIN_CATEGORY_SEO);
  if (!category) return null;

  return await metaObjecthandler(category);
};

export const SeoTagsHandlerSubCategory = async (
  subcategoryname: string,
  maincategory: string,
): Promise<Metadata | null> => {
  const subcategory = await fetchSingeSubCategory(
    subcategoryname,
    maincategory,
    FIND_ONE_SUB_CATEGORY_SEO,
  );

  if (!subcategory) return null;

  const meta = await metaObjecthandler(subcategory);

  const fullPath = `https://dev.twoguys.ae/${maincategory}/${subcategoryname}`;

  return {
    ...meta,
    alternates: {
      canonical: fullPath,
    },
    openGraph: {
      ...(meta.openGraph || {}),
      url: fullPath,
    },
  };
};

export const SeoTagsHandlerpproduct = async (
  productname: string,
  maincategory: string,
  subCategory: string,
  eComerece?: boolean,
  search_params?: SEARCH_PARAMS,
): Promise<Metadata | null> => {
  let product;
  if (eComerece) {
    product = await fetchSingeEComProduct(
      productname,
      maincategory,
      subCategory,
      FIND_ONE_PRODUCT_META,
    );
  } else {
    product = await fetchSingeProduct(productname, maincategory, subCategory, FIND_PRODUCT_META);
  }
  if (!product) return null;

  return await metaObjecthandler(product, search_params);
};

export const getAdminDetails = async () => {
  const user = await getServerSession(authOptions);
  // const user = 'hello';

  return user ? user : "this is my user object";
};
