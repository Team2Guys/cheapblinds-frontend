import { gql } from "@apollo/client";

// Upload a single image
export const UPLOAD_IMAGE = gql`
  mutation UploadImage($file: Upload!) {
    uploadImage(file: $file) {
      status
      message
      data {
        imageUrl
        publicId
        resourceType
      }
    }
  }
`;

// Delete an uploaded image by publicId
export const DELETE_IMAGE = gql`
  mutation DeleteImage($input: DeleteFileInput!) {
    deleteImage(input: $input) {
      status
      message
    }
  }
`;