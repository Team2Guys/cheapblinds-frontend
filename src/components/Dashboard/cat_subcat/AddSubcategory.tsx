"use client";

import React, { SetStateAction, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { Formik, Form, Field, FieldProps } from "formik";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Input, Toaster } from "@components";
import ImageUploader from "@components/ImageUploader/ImageUploader";
import { Category, ContentStatus, Subcategory } from "@/types/category";
import { useMutation } from "@apollo/client";
import { CREATE_SUBCATEGORY, UPDATE_SUBCATEGORY_BY_ID } from "@graphql";
import { useAuth } from "@context/UserContext";

interface Props {
  setMenuType: React.Dispatch<SetStateAction<string>>;
  categories?: Category[];
  editSubcategory?: Subcategory | undefined | null;
}

const AddSubcategory = ({ setMenuType, categories, editSubcategory }: Props) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | null>(
    editSubcategory?.thumbnailUrl || null,
  );
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { role } = user || {};

  const [createSubcategory] = useMutation(CREATE_SUBCATEGORY);
  const [updateSubcategory] = useMutation(UPDATE_SUBCATEGORY_BY_ID);

  const initialValues: Subcategory = {
    name: editSubcategory?.name || "",
    description: editSubcategory?.description || "",
    shortDescription: editSubcategory?.shortDescription || "",
    customUrl: editSubcategory?.customUrl || "",
    metaTitle: editSubcategory?.metaTitle || "",
    metaDescription: editSubcategory?.metaDescription || "",
    canonicalTag: editSubcategory?.canonicalTag || "",
    breadCrumb: editSubcategory?.breadCrumb || "",
    thumbnailUrl: editSubcategory?.thumbnailUrl || undefined,
    lastEditedBy: editSubcategory?.lastEditedBy || role,
    seoSchema: editSubcategory?.seoSchema || "",
    categoryId: editSubcategory?.categoryId || "",
    status: editSubcategory?.status || "DRAFT",
  };

  const onSubmit = async (values: Subcategory) => {
    if (!values.categoryId) {
      Toaster("error", "Please select a category!");
      return;
    }

    setLoading(true);

    try {
      const payload = { ...values, thumbnailUrl };

      if (editSubcategory?.id) {
        const { data } = await updateSubcategory({
          variables: { input: { id: editSubcategory.id, ...payload } },
        });

        const res = data?.updateSubcategoryById;

        if (res?.status?.toLowerCase() === "success") {
          Toaster("success", res.message || "Subcategory updated!");
          setMenuType("ViewSubCategory");
        } else {
          Toaster("error", res?.message || "Update failed!");
        }
      } else {
        const { data } = await createSubcategory({
          variables: { input: payload },
        });

        const res = data?.createSubcategory;

        if (res?.status?.toLowerCase() === "success") {
          Toaster("success", res.message || "Subcategory created!");
          setMenuType("ViewSubCategory");
        } else {
          Toaster("error", res?.message || "Creation failed!");
        }
      }
    } catch (error: unknown) {
      console.error("Subcategory error:", error);
      if (error instanceof Error) Toaster("error", error.message);
      else Toaster("error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const removeThumbnail = () => setThumbnailUrl(null);

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form className="space-y-6">
        {/* Top Bar */}
        <div className="flex flex-wrap justify-between items-center gap-2 mb-5">
          <p
            className="dashboard_primary_button flex items-center gap-1 cursor-pointer"
            onClick={() => setMenuType("ViewSubCategory")}
          >
            <IoMdArrowRoundBack /> Back
          </p>

          <div className="flex gap-4">
            {/* Status Buttons */}
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

            {/* Submit Button */}
            <button type="submit" className="dashboard_primary_button" disabled={loading}>
              {loading ? "Loading..." : "Submit"}
            </button>
          </div>
        </div>

        {/* Form Body */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-9 w-full border p-4 rounded-sm bg-white dark:bg-black/50 backdrop-blur-3xl">
            {/* Left Section */}
            <div className="space-y-4">
              {/* Thumbnail Upload */}
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
                      alt="Subcategory Thumbnail"
                      width={300}
                      height={200}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </>
                ) : (
                  <ImageUploader setThumbnail={setThumbnailUrl} />
                )}
              </div>

              <Input label="Subcategory Name" name="name" />
              <Input as="textarea" label="Description" name="description" />
              <Input as="textarea" label="Short Description" name="shortDescription" />
            </div>

            {/* Right Section */}
            <div className="space-y-4">
              <Input label="Custom Url" name="customUrl" />
              <Input label="Meta Title" name="metaTitle" />
              <Input as="textarea" label="Meta Description" name="metaDescription" />
              <Input label="Canonical Tag" name="canonicalTag" />
              <Input label="Bread Crumb" name="breadCrumb" />
              <Input label="SEO Schema" name="seoSchema" />

              {/* Category Select */}
              <Field name="categoryId">
                {({ field }: FieldProps) => (
                  <select
                    {...field}
                    className="w-full border p-2 rounded-md dark:bg-black dark:text-white"
                  >
                    <option value="">Select Category *</option>
                    {categories?.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                )}
              </Field>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default AddSubcategory;
