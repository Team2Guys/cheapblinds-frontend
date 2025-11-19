"use client";

import React, { SetStateAction, useState } from "react";
import { Formik, Form, Field, FieldProps } from "formik";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { IoMdArrowRoundBack } from "react-icons/io";
import ImageUploader from "@components/ImageUploader/ImageUploader";
import { Input, Toaster } from "@components";
import { Category, Product, Subcategory, productImage } from "@/types/category";
import { useAuth } from "@context/UserContext";
import { CREATE_PRODUCT, UPDATE_PRODUCT_BY_ID } from "@graphql";
import { useMutation } from "@apollo/client";

export interface AddProductProps {
  categoryList?: Category[];
  subCategoryList?: Subcategory[];
  setSelecteMenu: React.Dispatch<SetStateAction<string>>;
  editProduct?: Product | undefined | null
}

const AddProd = ({ setSelecteMenu, categoryList, subCategoryList, editProduct }: AddProductProps) => {
  const [thumbnailUrl, setThumbnailUrl] = useState<string | undefined>(editProduct?.thumbnailUrl);
  const [imagesUrl, setImagesUrl] = useState<productImage[] | undefined>(editProduct?.productImages || []);
  const [loading, setLoading] = useState(false);
  const { role } = useAuth();

  const [createProduct] = useMutation(CREATE_PRODUCT);
  const [updateProduct] = useMutation(UPDATE_PRODUCT_BY_ID);

  const initialValues: Product = {
    name: editProduct?.name || "",
    description: editProduct?.description || "",
    shortDescription: editProduct?.shortDescription || "",
    customUrl: editProduct?.customUrl || "",
    metaTitle: editProduct?.metaTitle || "",
    metaDescription: editProduct?.metaDescription || "",
    canonicalTag: editProduct?.canonicalTag || "",
    breadCrumb: editProduct?.breadCrumb || "",
    thumbnailUrl: editProduct?.thumbnailUrl,
    productImages: editProduct?.productImages || [],
    lastEditedBy: role,
    seoSchema: editProduct?.seoSchema || "",
    price: editProduct?.price || 0,
    discountPrice: editProduct?.discountPrice || 0,
    stock: editProduct?.stock || 0,
    additionalInfo: editProduct?.additionalInfo || [{ name: "", detail: "" }],
    measuringGuide: editProduct?.measuringGuide || [{ name: "", detail: "" }],
    categoryId: editProduct?.categoryId || "",
    subcategoryId: editProduct?.subcategoryId || "",
    status: editProduct?.status || "DRAFT",
  };

  const handleSubmit = async (values: Product) => {
    setLoading(true);

    try {
      const payload: Product = {
        ...values,
        thumbnailUrl,
        productImages: imagesUrl,
      };

      if (editProduct?.id) {
        // Update existing product
        const { data } = await updateProduct({
          variables: { input: { id: editProduct.id, ...payload } },
        });
        if (!data?.updateProductById?.status) {
          Toaster("error", data?.updateProductById?.message);
          return;
        }
        Toaster("success", "Product updated successfully!");
      } else {
        // Create new product
        const { data } = await createProduct({
          variables: { input: payload },
        });
        if (!data?.createProduct?.status) {
          Toaster("error", data?.createProduct?.message);
          return;
        }
        Toaster("success", "Product created successfully!");
      }

      setSelecteMenu("View Products");
    } catch (error) {
      console.error(error);
      Toaster("error", "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const removeThumbnail = () => setThumbnailUrl(undefined);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      <Form className="space-y-6 bg-white p-2 rounded-md border">
        {/* Top Bar */}
        <div className="flex justify-between items-center gap-2 mb-5">
          <p
            className="dashboard_primary_button flex items-center gap-1 cursor-pointer"
            onClick={() => setSelecteMenu("View Products")}
          >
            <IoMdArrowRoundBack /> Back
          </p>

          <div className="flex gap-4">
            {/* Status Buttons */}
            <Field name="status">
              {({ field, form }: FieldProps<string>) => (
                <div className="flex items-center gap-4 border-r-2 border-black dark:border-white px-2">
                  {(["DRAFT", "PUBLISHED"] as const).map((status) => {
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-9">
          <div className="space-y-4">
            {/* Thumbnail */}
            <div className="relative border rounded-sm border-stroke">
              <div className="border-b px-2 py-1 border-stroke">
                <h3 className="block mb-1 text-base font-medium">Add Thumbnail</h3>
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
                    src={thumbnailUrl || ""}
                    alt={thumbnailUrl}
                    width={300}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </>
              ) : (
                <ImageUploader setImagesUrl={setThumbnailUrl} />
              )}
            </div>

            {/* Inputs */}
            <Input label="Product Name" name="name" type="text" />
            <Input label="Breadcrumb" name="breadCrumb" type="text" />
            <Input label="Custom URL" name="customUrl" type="text" />
            <Input as="textarea" label="Description" name="description" />
            <Input as="textarea" label="Short Description" name="shortDescription" />

            <div className="flex gap-4">
              <Input label="Price" name="price" type="number" />
              <Input label="Discount Price" name="discountPrice" type="number" />
              <Input label="Stock" name="stock" type="number" />
            </div>

            <Input label="Meta Title" name="metaTitle" type="text" />
            <Input label="Canonical Tag" name="canonicalTag" type="text" />
            <Input as="textarea" label="Meta Description" name="metaDescription" />
            <Input as="textarea" label="SEO Schema" name="seoSchema" />
          </div>

          {/* Right Section */}
          <div className="space-y-4">
            <Field name="categoryId">
              {({ field, form }: FieldProps) => (
                <select
                  {...field}
                  className="w-full border p-2 rounded-md dark:bg-black dark:text-white"
                  onChange={(e) => {
                    const selected = e.target.value;
                    form.setFieldValue("categoryId", selected);

                    // Reset subcategory
                    form.setFieldValue("subcategoryId", "");
                  }}
                >
                  <option value="">Select Category</option>
                  {categoryList?.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              )}
            </Field>

            {/* Subcategory Select (filtered by categoryId) */}
            <Field name="subcategoryId">
              {({ field, form: { values } }: FieldProps) => {
                const filteredSubcategories = subCategoryList?.filter(
                  (s) => s.categoryId === values.categoryId,
                );

                return (
                  <select
                    {...field}
                    className="w-full border p-2 rounded-md dark:bg-black dark:text-white"
                  >
                    <option value="">Select Subcategory</option>

                    {filteredSubcategories?.map((sub) => (
                      <option key={sub.id} value={sub.id}>
                        {sub.name}
                      </option>
                    ))}
                  </select>
                );
              }}
            </Field>

            <Field name="additionalInfo">
              {({ field, form }: FieldProps) => (
                <div className="border rounded-sm p-4">
                  <h3 className="font-semibold mb-2">Additional Info</h3>

                  {field.value.map(
                    (item: Array<{ name: string; detail: string }>, index: number) => (
                      <div
                        key={index}
                        className="flex gap-3 items-center justify-center mb-3"
                      >
                        <Input label="Name" name={`additionalInfo[${index}].name`} type="text" />
                        <Input
                          label="Detail"
                          name={`additionalInfo[${index}].detail`}
                          type="text"
                        />

                        {index > 0 && (
                          <div
                            className="text-red-600 font-bold cursor-pointer mt-5"
                            onClick={() => {
                              const updated = [...field.value];
                              updated.splice(index, 1);
                              form.setFieldValue("additionalInfo", updated);
                            }}
                          >
                            X
                          </div>
                        )}
                      </div>
                    ),
                  )}

                  <button
                    type="button"
                    className="dashboard_primary_button mt-2"
                    onClick={() =>
                      form.setFieldValue("additionalInfo", [
                        ...field.value,
                        { name: "", detail: "" },
                      ])
                    }
                  >
                    + Add More
                  </button>
                </div>
              )}
            </Field>

            <Field name="measuringGuide">
              {({ field, form }: FieldProps) => (
                <div className="border rounded-sm p-4">
                  <h3 className="font-semibold mb-2">Additional Info</h3>

                  {field.value.map(
                    (item: Array<{ name: string; detail: string }>, index: number) => (
                      <div
                        key={index}
                        className="flex gap-3 items-center justify-center mb-3"
                      >
                        <Input label="Name" name={`measuringGuide[${index}].name`} type="text" />
                        <Input
                          label="Detail"
                          name={`measuringGuide[${index}].detail`}
                          type="text"
                        />

                        {index > 0 && (
                          <div
                            className="text-red-600 font-bold cursor-pointer mt-5"
                            onClick={() => {
                              const updated = [...field.value];
                              updated.splice(index, 1);
                              form.setFieldValue("measuringGuide", updated);
                            }}
                          >
                            X
                          </div>
                        )}
                      </div>
                    ),
                  )}

                  <button
                    type="button"
                    className="dashboard_primary_button mt-2"
                    onClick={() =>
                      form.setFieldValue("measuringGuide", [
                        ...field.value,
                        { name: "", detail: "" },
                      ])
                    }
                  >
                    + Add More
                  </button>
                </div>
              )}
            </Field>

            {/* Product Images */}
            <div className="rounded-sm border border-stroke p-4">
              <h3 className="primary-label">Add Product Images</h3>
              <ImageUploader setImagesUrl={setImagesUrl} multiple />
              <div className="grid grid-cols-3 gap-4 mt-4">
                {imagesUrl.map((item, index) => (
                  <div key={index} className="relative">
                    <Image
                      src={item.imagesrc}
                      width={150}
                      height={100}
                      className="object-cover w-full h-24 rounded"
                      alt={item.altText}
                    />
                    <RxCross2
                      className="absolute top-1 right-1 cursor-pointer text-red-500"
                      size={16}
                      onClick={() => setImagesUrl(imagesUrl.filter((_, i) => i !== index))}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default AddProd;
