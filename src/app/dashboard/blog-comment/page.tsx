import React from "react";
import MainPage from "./MainPage";
import { fetchSingleComment } from "config/generals";
import { fetchAllblogs } from "graphql/blogs";
import DefaultLayout from "components/Dashboard/DefaultLayout";

const BlogComment = async () => {
  const AllComment = await fetchSingleComment(fetchAllblogs);
  return (
    <DefaultLayout>
      <MainPage AllComment={AllComment} />
    </DefaultLayout>
  );
};

export default BlogComment;
