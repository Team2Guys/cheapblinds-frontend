"use client";

import React, { SetStateAction, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { Formik, Form, Field, FieldProps } from "formik";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Input, Toaster } from "@components";
import { useAuth } from "@context/UserContext";
import { Category, ContentStatus, productImage } from "@/types/category";
import { useMutation } from "@apollo/client";
import { CREATE_CATEGORY, UPDATE_CATEGORY_BY_ID } from "@graphql";
import ImageUploader from "@components/ImageUploader/ImageUploader";

const AddCategory = ({
  setMenuType,
  editCategory,
}: {
  editCategory?: Category | null;
  setMenuType: React.Dispatch<SetStateAction<string>>;
}) => {
  const { user } = useAuth();
  const { role } = user || {};

  const [thumbnailUrl, setThumbnailUrl] = useState<productImage | null>(null);
  const [loading, setLoading] = useState(false);

  const [updateCategory] = useMutation(UPDATE_CATEGORY_BY_ID);
  const [createCategory] = useMutation(CREATE_CATEGORY);
  const isEditing = Boolean(editCategory);

  const initialValues: Category = {
    name: editCategory?.name || "",
    description: editCategory?.description || "",
    shortDescription: editCategory?.shortDescription || "",
    customUrl: editCategory?.customUrl || "",
    metaTitle: editCategory?.metaTitle || "",
    metaDescription: editCategory?.metaDescription || "",
    canonicalTag: editCategory?.canonicalTag || "",
    breadCrumb: editCategory?.breadCrumb || "",
    seoSchema: editCategory?.seoSchema || "",
    lastEditedBy: editCategory?.lastEditedBy || role,
    status: editCategory?.status || "DRAFT",
  };

  const onSubmit = async (values: Category) => {
    setLoading(true);
    try {
      const payload = { ...values, thumbnailUrl };

      if (isEditing && editCategory?.id) {
        const { data } = await updateCategory({
          variables: { input: { id: editCategory.id, ...payload } },
        });

        if (!data?.updateCategoryById?.status) {
          Toaster("error", data?.updateCategoryById?.message);
          return;
        }
        Toaster("success", "Category updated successfully!");
      } else {
        const { data } = await createCategory({
          variables: { input: payload },
        });

        if (!data?.createCategory?.status) {
          Toaster("error", data?.createCategory?.message);
          return;
        }
        Toaster("success", "Category created successfully!");
      }

      setMenuType("Categories");
    } catch (error) {
      console.error("Error submitting category:", error);
      Toaster("error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const removeThumbnail = () => setThumbnailUrl(null);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className="space-y-6">
        <div className="flex flex-wrap justify-between items-center gap-2 mb-5">
          <p
            className="dashboard_primary_button flex items-center gap-1"
            onClick={() => setMenuType("Categories")}
          >
            <IoMdArrowRoundBack /> Back
          </p>

          <div className="flex gap-4">
            <Field name="status">
              {({ field, form }: FieldProps<string>) => (
                <div className="flex items-center gap-4 border-r-2 border-black dark:border-white px-2">
                  {(["DRAFT", "PUBLISHED"] as ContentStatus[]).map((status) => {
                    const isActive = field.value === status;
                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => form.setFieldValue(field.name, status)}
                        disabled={isActive}
                        className={`px-4 py-2 rounded-md text-sm ${
                          isActive
                            ? "dashboard_primary_button cursor-not-allowed"
                            : "bg-white text-black border border-gray-300 hover:bg-gray-100"
                        }`}
                      >
                        {status}
                      </button>
                    );
                  })}
                </div>
              )}
            </Field>

            <button type="submit" className="dashboard_primary_button" disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-9 w-full border p-4 rounded-sm bg-white dark:bg-black/50 backdrop-blur-3xl">
            <div className="space-y-4">
              <div className="relative border rounded-sm border-stroke">
                <div className="border-b px-2 py-1 border-stroke">
                  <h3 className="primary-label">Add Poster Image</h3>
                </div>

                {thumbnailUrl ? (
                  <>
                    <div className="absolute top-2 right-2">
                      <RxCross2
                        size={18}
                        className="cursor-pointer text-red-500 dark:text-red-700"
                        onClick={removeThumbnail}
                      />
                    </div>
                    <Image
                      src={thumbnailUrl}
                      alt="Category Thumbnail"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </>
                ) : (
                  <ImageUploader setImagesUrl={setThumbnailUrl} />
                )}
              </div>

              <Input label="Category Name" name="name" />
              <Input as="textarea" label="Description" name="description" />
              <Input as="textarea" label="Short Description" name="shortDescription" />
            </div>

            <div className="space-y-4">
              <Input label="Custom Url" name="customUrl" />
              <Input label="Meta Title" name="metaTitle" />
              <Input as="textarea" label="Meta Description" name="metaDescription" />
              <Input label="Canonical Tag" name="canonicalTag" />
              <Input label="Bread Crumb" name="breadCrumb" />
              <Input label="SEO Schema" name="seoSchema" />
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default AddCategory;
