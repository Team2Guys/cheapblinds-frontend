import { gql } from "@apollo/client";

export const CREATE_BLOG = gql`
  mutation CreateBlog($createBlogInput: CreateBlogInput!) {
    createBlog(createBlogInput: $createBlogInput) {
      id
      title
    }
  }
`;

export const GET_ALL_BLOGS = gql`
  query GetAllBlogs {
    get_all_blogs {
      id
      title
      content
      custom_url
      category
      createdAt
      updatedAt
      posterImage
      last_editedBy
      Canonical_Tag
      Meta_Description
      Meta_Title
      redirectionUrl
      publishedAt
      status
      isPublished
      comments {
        id
        name
        status
      }
    }
  }
`;

export const UPDATE_BLOG = gql`
  mutation UpdateBlog($updateBlogInput: UpdateBlogInput!) {
    updateBlog(updateBlogInput: $updateBlogInput) {
      id
      title
    }
  }
`;

export const REMOVE_BLOG = gql`
  mutation RemoveBlog($id: Int!) {
    Remove_blog(id: $id) {
      id
      title
    }
  }
`;

// commments

export const ADD_COMMENT = gql`
  mutation AddComment($CreateCommentDto: CreateCommentDto!) {
    addComment(CreateCommentDto: $CreateCommentDto) {
      id
      name
      Email
      phone
      description
      blogId
      replies
    }
  }
`;

export const CREATE_REPLY = gql`
  mutation CreateReply($CreateReply: CreateReply!) {
    CreateReply(CreateReply: $CreateReply) {
      id
      replies
    }
  }
`;

export const UPDATE_COMMENT_STATUS = gql`
  mutation UpdateStatus($UpdateStatus: UpdateStatus!) {
    UpdateStatus(UpdateStatus: $UpdateStatus) {
      id
      status
    }
  }
`;

export const UPDATE_REPLY_STATUS = gql`
  mutation UpdateReplyStatus($updateReplystatus: updateReplystatus!) {
    updatereplyStatus(updateReplystatus: $updateReplystatus) {
      id
      replies
    }
  }
`;

export const fetchAllblogs = gql`
  query Allcoments {
    Allcoments {
      id
      name
      Email
      phone
      description
      createdAt
      replies
      blogId
      status
      last_editedBy
      blog {
        id
        title
      }
    }
  }
`;
