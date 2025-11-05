"use client";
import React, { useEffect, useRef, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import {
  handleCropClick,
  handleCropModalCancel,
  handleCropModalOk,
  handleImageAltText,
  ImageRemoveHandler,
  onCropComplete,
  onImageLoad,
} from "@utils/helperFunctions";
import { Formik, Form, FormikHelpers, Field, ErrorMessage } from "formik";
import { IoMdArrowRoundBack } from "react-icons/io";
import { DASHBOARD_ADD_SUBCATEGORIES_PROPS } from "@/types/PagesProps";
import { ProductImage } from "@/types/prod";
import { ISUBCATEGORY_EDIT } from "@/types/cat";
import ImageUploader from "@components/ImageUploader/ImageUploader";
import { useMutation } from "@apollo/client";
import revalidateTag from "@components/ServerActons/ServerAction";
import ReactCrop, { Crop } from "react-image-crop";
import TinyMCEEditor from "@components/Dashboard/tinyMc/MyEditor";
import { subcategoryInitialValues } from "@data/InitialValues";
import { subcategoryValidationSchema } from "@data/Validations";
import { useSession } from "next-auth/react";
import { CREATE_SUBCATEGORY, GET_ALL_SUBCATEGORIES, UPDATE_SUBCATEGORY } from "@graphql/categories";
import { showToast } from "@components/Toaster/Toaster";
import { ConfirmToast } from "@components/common/ConfirmToast";
import Modal from "@components/ui/modal";

const AddSubcategory = ({
  seteditCategory,
  editCategory,
  setMenuType,
  categoriesList,
}: DASHBOARD_ADD_SUBCATEGORIES_PROPS) => {
  const CategoryName: ISUBCATEGORY_EDIT =
    editCategory && editCategory.name
      ? { ...editCategory, category: editCategory.category?.id }
      : subcategoryInitialValues;

  const [posterimageUrl, setposterimageUrl] = useState<ProductImage[] | undefined>(
    editCategory && editCategory?.posterImageUrl ? [editCategory?.posterImageUrl] : undefined,
  );
  const [BannerImageUrl, setBannerImageUrl] = useState<ProductImage[] | undefined>(
    editCategory && editCategory?.Banners ? [editCategory?.Banners] : undefined,
  );

  const [isCropModalVisible, setIsCropModalVisible] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [loading, setloading] = useState<boolean>(false);

  const [editCategoryName, setEditCategoryName] = useState<ISUBCATEGORY_EDIT>(CategoryName);
  const session = useSession();
  const finalToken = session.data?.accessToken;
  const formikValuesRef = useRef<ISUBCATEGORY_EDIT>(editCategoryName);
  const [createSubCategory] = useMutation(CREATE_SUBCATEGORY);
  const [updateSubCategory] = useMutation(UPDATE_SUBCATEGORY);

  const onSubmit = async (
    values: ISUBCATEGORY_EDIT,
    { resetForm }: FormikHelpers<ISUBCATEGORY_EDIT>,
  ) => {
    if (!values.category) {
      return showToast("warning", "Select parent category!!");
    }
    try {
      setloading(true);
      const posterImageUrl = posterimageUrl && posterimageUrl[0];
      const Banner = BannerImageUrl && BannerImageUrl[0];
      const formValues = {
        ...values,
        posterImageUrl: posterImageUrl || {},
        Banners: Banner,
        category: Number(values.category),
      };

      const updateFlag = editCategoryName ? true : false;
      // eslint-disable-next-line
      const { updatedAt, createdAt, __typename, ...newValue } = formValues;
      if (updateFlag) {
        // Update Existing SubCategory
        await updateSubCategory({
          variables: {
            input: {
              id: Number(editCategory?.id),
              ...newValue,
            },
          },
          refetchQueries: [{ query: GET_ALL_SUBCATEGORIES }],
          context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
          },
        });
        showToast("success", "Sub Category has been successfully updated!");
      } else {
        // Create New SubCategory
        await createSubCategory({
          variables: {
            input: newValue,
          },
          refetchQueries: [{ query: GET_ALL_SUBCATEGORIES }],
          context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
          },
        });
        showToast("success", "Sub Category has been successfully created!");
      }

      revalidateTag("subcategories");

      setloading(false);
      seteditCategory?.(undefined);
      setposterimageUrl(undefined);
      setBannerImageUrl(undefined);
      resetForm();
      setMenuType("Sub Categories");
    } catch (err) {
      setloading(false);

      showToast("error", "Something went wrong!");
      throw err;
    }
  };

  useEffect(() => {
    setposterimageUrl(
      editCategory && editCategory?.posterImageUrl ? [editCategory?.posterImageUrl] : undefined,
    );
    setBannerImageUrl(editCategory && editCategory?.Banners ? [editCategory?.Banners] : undefined);

    setEditCategoryName(CategoryName);
  }, [editCategory]);

  const hasUnsavedChanges = (): boolean => {
    let isPosterChanged: boolean;
    let isBannerChanged: boolean;

    if (editCategory) {
      const oldPoster = editCategory?.posterImageUrl;
      const newPoster = posterimageUrl?.[0];

      isPosterChanged =
        !oldPoster || !newPoster
          ? oldPoster !== newPoster
          : oldPoster.public_id !== newPoster.public_id ||
            (oldPoster.altText ?? "") !== (newPoster.altText ?? "");

      const oldBanner = editCategory?.Banners;
      const newBanner = BannerImageUrl?.[0];

      isBannerChanged =
        !oldBanner || !newBanner
          ? oldBanner !== newBanner
          : oldBanner.public_id !== newBanner.public_id ||
            (oldBanner.altText ?? "") !== (newBanner.altText ?? "");
    } else {
      // Adding mode (initially no images)
      isPosterChanged = !!posterimageUrl && posterimageUrl.length > 0;
      isBannerChanged = !!BannerImageUrl && BannerImageUrl.length > 0;
    }

    const isFormChanged =
      JSON.stringify(editCategoryName) !==
      JSON.stringify({
        ...formikValuesRef.current,
        category:
          formikValuesRef.current.category === ""
            ? formikValuesRef.current.category
            : Number(formikValuesRef.current.category),
      });
    return isPosterChanged || isBannerChanged || isFormChanged;
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges()) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    const handlePopState = () => {
      if (hasUnsavedChanges()) {
        window.history.pushState(null, "", window.location.href);

        ConfirmToast({
          onConfirm: () => {
            setMenuType("Sub Categories");
          },
          onCancel: () => {},
        });
      } else {
        setMenuType("Sub Categories");
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [editCategoryName, BannerImageUrl, posterimageUrl]);

  const handleBack = () => {
    if (hasUnsavedChanges()) {
      ConfirmToast({
        onConfirm: () => {
          setMenuType("Sub Categories");
        },
        onCancel: () => {
          // optional: do nothing
        },
      });
      return;
    }

    setMenuType("Sub Categories");
  };

  return (
    <Formik
      initialValues={editCategoryName}
      enableReinitialize
      validationSchema={subcategoryValidationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        formikValuesRef.current = formik.values;

        return (
          <Form onSubmit={formik.handleSubmit}>
            <div className="flex flex-wrap mb-5 gap-2 justify-between items-center">
              <p className="dashboard_primary_button" onClick={handleBack}>
                <IoMdArrowRoundBack /> Back
              </p>
              <div className="flex justify-center gap-4">
                <Field name="status">
                  {({ field, form }: import("formik").FieldProps) => (
                    <div className="flex gap-4 items-center border-r-2 px-2">
                      {["DRAFT", "PUBLISHED"].map((status, index) => {
                        const isActive = field.value === status;

                        return (
                          <button
                            key={index}
                            type="button"
                            onClick={() => form.setFieldValue("status", status)}
                            disabled={isActive}
                            className={`px-4 py-2 rounded-md text-sm
                                  ${
                                    isActive
                                      ? "dashboard_primary_button cursor-not-allowed"
                                      : "bg-white text-black border-gray-300 hover:bg-gray-100 cursor-pointer"
                                  }`}
                          >
                            {status}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </Field>
                <button
                  type="submit"
                  className="dashboard_primary_button cursor-pointer"
                  disabled={loading}
                  aria-label={undefined}
                >
                  {loading ? "loading.." : "Submit"}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-9 w-full rounded-sm border border-stroke p-4 bg-white dark:bg-black/50 backdrop-blur-3xl">
              <div>
                <div className="rounded-sm border border-stroke">
                  <div className="border-b border-stroke px-2 ">
                    <h3 className="primary-label">Add Poster Image</h3>
                  </div>
                  {posterimageUrl?.[0] && posterimageUrl.length > 0 ? (
                    <div className="p-4 ">
                      {posterimageUrl.map((item: ProductImage, index: number) => {
                        return (
                          <div
                            className="relative group rounded-lg w-fit  overflow-hidden shadow-md border transform transition-transform duration-300 hover:scale-105"
                            key={index}
                          >
                            <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full ">
                              <RxCross2
                                className="cursor-pointer border rounded text-red-500 dark:text-red-700"
                                size={17}
                                onClick={() => {
                                  ImageRemoveHandler(item.public_id, setposterimageUrl, finalToken);
                                }}
                              />
                            </div>
                            <Image
                              onClick={() =>
                                handleCropClick(item.imageUrl, setImageSrc, setIsCropModalVisible)
                              }
                              key={index}
                              className="w-full h-full dark:bg-black dark:shadow-lg cursor-crosshair"
                              width={200}
                              height={500}
                              loading="lazy"
                              src={item?.imageUrl || ""}
                              alt={`productImage-${index}`}
                            />
                            <input
                              className="dashboard_input"
                              placeholder="Alt Text"
                              type="text"
                              name="altText"
                              value={item?.altText || ""}
                              onChange={(e) =>
                                handleImageAltText(
                                  index,
                                  String(e.target.value),
                                  setposterimageUrl,
                                  "altText",
                                )
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <ImageUploader setImagesUrl={setposterimageUrl} />
                  )}
                </div>

                <div className="rounded-sm border mt-4 border-stroke dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke px-2 ">
                    <h3 className="primary-label">Add Banner Image</h3>
                  </div>
                  {BannerImageUrl?.[0] && BannerImageUrl?.length > 0 ? (
                    <div className=" p-4 ">
                      {BannerImageUrl.map((item: ProductImage, index: number) => {
                        return (
                          <div
                            className="relative border group  rounded-lg w-fit  overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105"
                            key={index}
                          >
                            <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full cursor-pointer z-20">
                              <RxCross2
                                className="cursor-pointer borde text-red-500"
                                size={25}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  ImageRemoveHandler(item.public_id, setBannerImageUrl, finalToken);
                                }}
                              />
                            </div>

                            {item.resource_type == "video" ? (
                              <video
                                key={index}
                                // src={item?.imageUrl || ""}
                                height={200}
                                width={200}
                                className="w-full h-full max-h-[300px] max-w-full dark:bg-black dark:shadow-lg"
                                autoPlay
                                muted
                                controls
                              >
                                <source src={item?.imageUrl || ""} />
                              </video>
                            ) : (
                              <>
                                <Image
                                  onClick={() =>
                                    handleCropClick(
                                      item.imageUrl,
                                      setImageSrc,
                                      setIsCropModalVisible,
                                    )
                                  }
                                  key={index}
                                  className="w-full h-full dark:bg-black dark:shadow-lg cursor-crosshair"
                                  width={200}
                                  height={500}
                                  loading="lazy"
                                  src={item?.imageUrl || ""}
                                  alt={`productImage-${index}`}
                                />

                                <input
                                  className="dashboard_input"
                                  placeholder="Alt Text"
                                  type="text"
                                  name="altText"
                                  value={item?.altText || ""}
                                  onChange={(e) =>
                                    handleImageAltText(
                                      index,
                                      String(e.target.value),
                                      setBannerImageUrl,
                                      "altText",
                                    )
                                  }
                                />
                              </>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <ImageUploader setImagesUrl={setBannerImageUrl} video s3Flag />
                  )}
                </div>

                <div className="flex flex-col gap-4 md:py-6">
                  <div>
                    <label className="primary-label" aria-label="Sub Category Title">
                      Sub Category Name
                    </label>

                    <Field
                      type="text"
                      name="name"
                      placeholder="Title"
                      className="dashboard_input"
                    />

                    <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>
                    <label className="primary-label" aria-label="Custom Url">
                      Custom Url
                    </label>

                    <Field
                      type="text"
                      name="custom_url"
                      placeholder="Custom Url"
                      className="dashboard_input"
                    />
                    <ErrorMessage
                      name="custom_url"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>

                  <div>
                    <label className="primary-label" aria-label="Select Parent Category">
                      Select Parent Category (atleat one)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Field as="select" name="category" className="dashboard_input">
                        <option className="" value="" disabled>
                          Select Category
                        </option>

                        {categoriesList.map((category, index) => (
                          <option key={index} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                      </Field>
                    </div>
                    <ErrorMessage name="category" component="div" className="text-red-500 " />
                  </div>
                  <Field name="status">
                    {({ field, form }: import("formik").FieldProps) => (
                      <div className="flex gap-4 items-center my-4">
                        <label className="primary-label">Sub Category Status:</label>

                        {["DRAFT", "PUBLISHED"].map((status, index) => {
                          const isActive = field.value === status;

                          return (
                            <button
                              key={index}
                              type="button"
                              onClick={() => form.setFieldValue("status", status)}
                              disabled={isActive}
                              className={`px-4 py-2 rounded-md text-sm drop-shadow-md
                                  ${
                                    isActive
                                      ? "dashboard_primary_button cursor-not-allowed"
                                      : "bg-white text-black cursor-pointer"
                                  }`}
                            >
                              {status}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </Field>
                </div>
              </div>
              <div>
                <div>
                  <label className="primary-label">Category Description</label>
                  <TinyMCEEditor name="description" />
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-red-500 text-sm">{formik.errors.description}</div>
                  )}
                </div>

                <div className="flex gap-4 mt-4">
                  <div className="w-2/4">
                    <label className="primary-label">Meta Title</label>
                    <Field
                      type="text"
                      name="Meta_Title"
                      placeholder="Meta Title"
                      className={`primary-input ${
                        formik.touched.Meta_Title && formik.errors.Meta_Title
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {formik.touched.Meta_Title && formik.errors.Meta_Title && (
                      <div className="text-red text-sm">{formik.errors.Meta_Title as string}</div>
                    )}
                  </div>
                  <div className="w-2/4">
                    <label className="primary-label">Canonical Tag</label>
                    <Field
                      type="text"
                      name="Canonical_Tag"
                      placeholder="Canonical Tag"
                      className={`primary-input ${
                        formik.touched.Canonical_Tag && formik.errors.Canonical_Tag
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {formik.touched.Canonical_Tag && formik.errors.Canonical_Tag && (
                      <div className="text-red text-sm">
                        {formik.errors.Canonical_Tag as string}
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="primary-label">Meta Description</label>
                  <Field
                    as="textarea"
                    name="Meta_Description"
                    placeholder="Meta Description"
                    className={`primary-input ${
                      formik.touched.Meta_Description && formik.errors.Meta_Description
                        ? "border-red-500"
                        : ""
                    }`}
                  />
                  {formik.touched.Meta_Description && formik.errors.Meta_Description && (
                    <div className="text-red text-sm">
                      {formik.errors.Meta_Description as string}
                    </div>
                  )}
                </div>
                <div className="flex gap-4 mt-2">
                  <div className="w-full">
                    <label className="primary-label">Short Description</label>
                    <Field
                      type="text"
                      name="short_description"
                      placeholder="Short Description"
                      className={`primary-input ${
                        formik.touched.short_description && formik.errors.short_description
                          ? "border-red-500"
                          : ""
                      }`}
                    />
                    {formik.touched.short_description && formik.errors.short_description && (
                      <div className="text-red text-sm">
                        {formik.errors.short_description as string}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-4 dashboard_primary_button not-[]:cursor-pointer"
                disabled={loading}
                aria-label="Submit Subcategory"
              >
                {loading ? "loading.." : "Submit"}
              </button>
            </div>
            <Modal
              title="Crop Image"
              isOpen={isCropModalVisible}
              onOk={() =>
                handleCropModalOk(
                  croppedImage,
                  imageSrc,
                  setIsCropModalVisible,
                  setCroppedImage,
                  setposterimageUrl,
                  setBannerImageUrl,
                )
              }
              onCancel={() => handleCropModalCancel(setIsCropModalVisible, setCroppedImage)}
              onClose={() => setIsCropModalVisible(false)}
              width={500}
              height={400}
            >
              {imageSrc && (
                <ReactCrop
                  crop={crop}
                  onChange={(newCrop) => setCrop(newCrop)}
                  onComplete={() => onCropComplete(crop, imgRef, setCroppedImage)}
                >
                  <Image
                    width={500}
                    height={300}
                    ref={imgRef}
                    src={imageSrc}
                    alt="Crop me"
                    style={{ maxWidth: "100%" }}
                    onLoad={(e) => onImageLoad(e, setCrop)}
                    crossOrigin="anonymous"
                  />
                </ReactCrop>
              )}
            </Modal>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddSubcategory;
