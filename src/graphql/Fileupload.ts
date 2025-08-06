

export const FILE_UPLOAD_MUTATION = `
  mutation UploadFile($file: Upload!) {
    createFileUploading(file: $file) {
     imageUrl
     public_id
     resource_type
    }
  }
`;

export const FILE_UPLOAD_MUTATION_S3 = `
  mutation UploadFile3($file: Upload!) {
    uploadFile(file: $file) {
     imageUrl
     public_id
     resource_type
    }
  }
`;



export const FILE_DELETION_MUTATION = `
          mutation DeleteImage($public_id: String!) {
            DeleteImage(RemoveUImage: { public_id: $public_id })
          }

        `
export const FILE_DELETION_MUTATION_S3 = `
          mutation DeleteImage($public_id: String!) {
            Del_S3_file(RemoveUImage: { public_id: $public_id })
          }
        `
