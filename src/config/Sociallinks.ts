import { DocumentNode } from "@apollo/client";
import { GET_SOCIAL_LINKS } from "@graphql/Socials";
import ApolloCustomClient from "@utils/apollo-client";

export const fetchSocialLinks = async (FIND_QUICK_VIEW_PRODUCT?: DocumentNode) => {
  try {
    const { data } = await ApolloCustomClient.query({
      query: FIND_QUICK_VIEW_PRODUCT ? FIND_QUICK_VIEW_PRODUCT : GET_SOCIAL_LINKS,

      fetchPolicy: "no-cache",
      context: {
        fetchOptions: { next: { tags: ["socialsLinks"] } },
      },
    });
    return data?.SocialLinks;
  } catch (error) {
    return [];
    throw error;
  }
};

export const generateSlug = (text: string) => {
  if (!text) return "";
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-");
};
