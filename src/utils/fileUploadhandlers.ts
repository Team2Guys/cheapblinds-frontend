import showToast from "@components/Toaster/Toaster";
import { FILE_UPLOAD_MUTATION, FILE_UPLOAD_MUTATION_S3 } from "@graphql/Fileupload";

export const uploadPhotosToBackend = async (file: File, s3Flag?: boolean, resumeflag?: boolean) => {
  if (!file) return showToast("error", `Select a File`);

  try {
    const isImage = file.type.startsWith("image/");
    const isVideo = file.type.startsWith("video/");
    const ispdf =
      file.type.startsWith("doc/") || file.type.startsWith("doc/") || file.type.startsWith("pdf/");

    if (!isImage && !isVideo && !ispdf && !resumeflag) {
      showToast("error", `Skipped unsupported file type: ${file.name}`);
      return null;
    }

    const maxImageSize = 1 * 1024 * 1024; // 1 MB
    const maxVideoSize = 5 * 1024 * 1024; // 2 MB

    if ((isImage && file.size > maxImageSize) || ((isVideo || ispdf) && file.size > maxVideoSize)) {
      showToast("error", `Skipped large file: ${file.name} Please upload file in less size`);
      return null;
    }

    const formData = new FormData();
    formData.append(
      "operations",
      JSON.stringify({
        query: s3Flag ? FILE_UPLOAD_MUTATION_S3 : FILE_UPLOAD_MUTATION,
        variables: { file: null },
      }),
    );
    formData.append("map", JSON.stringify({ file: ["variables.file"] }));
    formData.append("file", file);
    const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL || "", {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    const result = await response.json();

    const responseType = s3Flag ? "uploadFile" : "createFileUploading";
    console.log(result, "result");
    return result?.data?.[responseType];
  } catch (error) {
    console.log(error, "error ");
    throw error && null;
  }
};
