"use client";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
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
import { Formik, Form, FormikHelpers, ErrorMessage, Field } from "formik";
import { IoMdArrowRoundBack } from "react-icons/io";
import ImageUploader from "@components/ImageUploader/ImageUploader";
import { ProductImage } from "@/types/prod";
import { Category, EDIT_CATEGORY } from "@/types/cat";
import ReactCrop, { Crop } from "react-image-crop";
import TinyMCEEditor from "@components/Dashboard/tinyMc/MyEditor";
import revalidateTag from "@components/ServerActons/ServerAction";
import { useSession } from "next-auth/react";
import ApoloClient from "@utils/AppoloClient";
import { CREATE_CATEGORY, GET_ALL_CATEGORIES, UPDATE_CATEGORY } from "@graphql/categories";
import { categoryValidationSchema } from "@data/Validations";
import { categoryInitialValues } from "@data/InitialValues";
import { showToast } from "@/components/Toaster/Toaster";
import { ConfirmToast } from "@/components/common/ConfirmToast";
import Modal from "@/components/ui/modal";

interface editCategoryProps {
  seteditCategory: React.Dispatch<SetStateAction<Category | undefined | null>>;
  editCategory: Category | undefined | null;
  setMenuType: React.Dispatch<SetStateAction<string>>;
}

const AddCategory = ({ seteditCategory, editCategory, setMenuType }: editCategoryProps) => {
  const CategoryName: EDIT_CATEGORY =
    editCategory && editCategory.name ? editCategory : categoryInitialValues;

  const session = useSession();
  const finalToken = session.data?.accessToken;
  const [posterimageUrl, setposterimageUrl] = useState<ProductImage[] | undefined>(
    editCategory && editCategory.posterImageUrl ? [editCategory.posterImageUrl] : undefined,
  );
  const [BannerImageUrl, setBannerImageUrl] = useState<ProductImage[] | undefined>(
    editCategory && editCategory?.Banners ? [editCategory?.Banners] : undefined,
  );
  const [loading, setloading] = useState<boolean>(false);
  const [editCategoryName, setEditCategoryName] = useState<EDIT_CATEGORY>(CategoryName);
  const [isCropModalVisible, setIsCropModalVisible] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const formikValuesRef = useRef<EDIT_CATEGORY>(editCategoryName);

  const onSubmit = async (values: EDIT_CATEGORY, { resetForm }: FormikHelpers<EDIT_CATEGORY>) => {
    try {
      const posterImageUrl = (posterimageUrl && posterimageUrl[0]) || {};
      const Banner = BannerImageUrl && BannerImageUrl[0];
      if (!posterImageUrl) return showToast("error", "Please select relevant Images");
      const formValues = { ...values, posterImageUrl, Banners: Banner };
      // eslint-disable-next-line
      const { updatedAt, createdAt, __typename, subCategories, Products, ...newValue } = formValues;
      const updateFlag = editCategoryName ? true : false;
      setloading(true);
      if (updateFlag) {
        await ApoloClient.mutate({
          mutation: UPDATE_CATEGORY,
          context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
            credentials: "include",
          },
          variables: { input: { id: Number(editCategory?.id), ...newValue } },
          refetchQueries: [{ query: GET_ALL_CATEGORIES }],
        });
      } else {
        await ApoloClient.mutate({
          mutation: CREATE_CATEGORY,
          variables: { input: newValue },
          refetchQueries: [{ query: GET_ALL_CATEGORIES }],
          context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
            credentials: "include",
          },
        });
      }

      revalidateTag("categories");

      showToast(
        "success",
        updateFlag
          ? "Category has been successfully updated!"
          : "Category has been successfully created!",
      );

      seteditCategory?.(undefined);
      setposterimageUrl(undefined);
      setMenuType("Categories");
      resetForm();
    } catch (err) {
      //eslint-disable-nextline
      //@ts-expect-error("Expected error")
      Toaster("error", err?.message || "Internal Server Error");
    } finally {
      setloading(false);
    }
  };
  console.log(CategoryName);
  useEffect(() => {
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
      JSON.stringify(editCategoryName) !== JSON.stringify(formikValuesRef.current);

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
            setMenuType("Categories");
          },
          onCancel: () => {
            // do nothing, just stay on current page
          },
        });
      } else {
        setMenuType("All Reviews");
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
          setMenuType("Categories");
        },
        onCancel: () => {
          // do nothing, stay in form
        },
      });
      return;
    }

    setMenuType("Categories");
  };

  return (
    <Formik
      initialValues={editCategoryName}
      validationSchema={categoryValidationSchema}
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
                    <div className="flex gap-4 items-center border-r-2 border-black dark:border-white px-2">
                      {["DRAFT", "PUBLISHED"].map((status) => {
                        const isActive = field.value === status;

                        return (
                          <button
                            key={status}
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
                >
                  {loading ? "loading.." : "Submit"}
                </button>
              </div>
            </div>
            <div className="flex justify-center ">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-9 w-full mb-5 xs:mb-10 rounded-sm border border-stroke p-4 bg-white dark:bg-black/50 backdrop-blur-3xl">
                <div className="">
                  <div className="rounded-sm border border-stroke">
                    <div className="border-b  border-stroke px-2">
                      <h3 className="primary-label">Add Poster Image</h3>
                    </div>
                    {posterimageUrl && posterimageUrl.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4  dark:border-white dark:bg-black">
                        {posterimageUrl.map((item: ProductImage, index: number) => {
                          return (
                            <div
                              className="relative group rounded-lg overflow-hidden shadow-md border transform transition-transform duration-300 hover:scale-105 flex flex-col"
                              key={index}
                            >
                              <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full ">
                                <RxCross2
                                  className="cursor-pointer text-red-500 dark:text-red-700"
                                  size={17}
                                  onClick={() => {
                                    ImageRemoveHandler(
                                      item.public_id,
                                      setposterimageUrl,
                                      finalToken,
                                    );
                                  }}
                                />
                              </div>

                              <Image
                                onClick={() =>
                                  handleCropClick(item.imageUrl, setImageSrc, setIsCropModalVisible)
                                }
                                key={index}
                                className="object-cover w-full h-full dark:bg-black dark:shadow-lg cursor-crosshair"
                                width={300}
                                height={200}
                                src={item.imageUrl}
                                loading="lazy"
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
                    onClose={() => handleCropModalCancel(setIsCropModalVisible, setCroppedImage)}
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
                  <div className="rounded-sm border mt-4 border-stroke dark:border-strokedark ">
                    <div className="border-b border-stroke px-2">
                      <h3 className="primary-label">Add Banner Image / Video</h3>
                    </div>
                    {BannerImageUrl?.[0] && BannerImageUrl?.length > 0 ? (
                      <div className=" p-4 ">
                        {BannerImageUrl.map((item: ProductImage, index: number) => {
                          return (
                            <div
                              className="relative border group rounded-lg w-fit  overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105"
                              key={index}
                            >
                              <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full cursor-pointer z-20">
                                <RxCross2
                                  className="cursor-pointer borde text-red-500"
                                  size={25}
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    ImageRemoveHandler(
                                      item.public_id,
                                      setBannerImageUrl,
                                      finalToken,
                                    );
                                  }}
                                />
                              </div>

                              {item.resource_type == "video" ? (
                                <video
                                  key={index}
                                  src={item?.imageUrl || ""}
                                  height={200}
                                  width={200}
                                  className="w-full h-full max-h-[300] max-w-full dark:bg-black dark:shadow-lg"
                                  autoPlay
                                  muted
                                  controls
                                />
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

                  <div className="flex flex-col">
                    <div>
                      <label className="primary-label" aria-label="Category Title">
                        Category Title
                      </label>
                      <Field
                        type="text"
                        name="name"
                        placeholder="Title"
                        className={`primary-input ${
                          formik.touched.name && formik.errors.name ? "red_border" : ""
                        }`}
                      />
                      <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className="flex gap-0 sm:gap-10 flex-wrap sm:flex-nowrap">
                      <div className="w-full">
                        <label className="primary-label" aria-label="Custom URL">
                          Custom URL
                        </label>
                        <Field
                          type="text"
                          name="custom_url"
                          placeholder="Custom URL"
                          className={`primary-input ${formik.touched.custom_url && formik.errors.custom_url ? "red_border" : ""}`}
                        />
                        <ErrorMessage
                          name="custom_url"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>

                      <div className="w-full ">
                        <label className="primary-label">Bread Crum</label>
                        <Field
                          type="text"
                          name="breadCrum"
                          placeholder="breadCrum"
                          className={`primary-input ${
                            formik.touched.breadCrum && formik.errors.breadCrum ? "red_border" : ""
                          }`}
                        />
                        <ErrorMessage
                          name="breadCrum"
                          component="div"
                          className="text-red-500 text-sm"
                        />
                      </div>
                    </div>
                    <div className="input_container">
                      <div className="w-full">
                        <label className="primary-label">Short Description</label>
                        <input
                          type="text"
                          name="short_description"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.short_description}
                          placeholder="Short Description"
                          className={`primary-input ${
                            formik.touched.short_description && formik.errors.short_description
                              ? "red_border"
                              : ""
                          }`}
                        />
                        {formik.touched.short_description && formik.errors.short_description ? (
                          <div className="text-red text-sm">
                            {formik.errors.short_description as string}
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <Field name="status">
                    {({ field, form }: import("formik").FieldProps) => (
                      <div className="flex gap-4 items-center my-4 md:pt-24">
                        <label className="font-semibold text-black dark:text-white">
                          Category Status:
                        </label>

                        {["DRAFT", "PUBLISHED"].map((status) => {
                          const isActive = field.value === status;

                          return (
                            <button
                              key={status}
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
                <div>
                  <div>
                    <label className="primary-label">Category Description</label>
                    <TinyMCEEditor name="description" />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div className="input_container">
                    <div className="input_iner_container">
                      <label className="primary-label">Meta Title</label>
                      <input
                        type="text"
                        name="Meta_Title"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.Meta_Title}
                        placeholder="Meta Title"
                        className={`primary-input ${
                          formik.touched.Meta_Title && formik.errors.Meta_Title ? "red_border" : ""
                        }`}
                      />
                      {formik.touched.Meta_Title && formik.errors.Meta_Title ? (
                        <div className="text-red text-sm">{formik.errors.Meta_Title as string}</div>
                      ) : null}
                    </div>

                    <div className="input_iner_container">
                      <label className="primary-label">Canonical Tag</label>
                      <Field
                        type="text"
                        name="Canonical_Tag"
                        placeholder="Canonical Tag"
                        className={`primary-input ${
                          formik.touched.Canonical_Tag && formik.errors.Canonical_Tag
                            ? "red_border"
                            : ""
                        }`}
                      />
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
                          ? "red_border"
                          : ""
                      }`}
                    />
                    <ErrorMessage
                      name="Meta_Description"
                      component="div"
                      className="text-red text-sm"
                    />
                  </div>
                  <div className="mt-4">
                    <label className="primary-label">Seo Schema</label>
                    <Field
                      as="textarea"
                      name="seoSchema"
                      placeholder="Seo Schema"
                      className={`primary-input ${
                        formik.touched.seoSchema && formik.errors.seoSchema ? "red_border" : ""
                      }`}
                    />
                    <ErrorMessage name="seoSchema" component="div" className="text-red text-sm" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center mt-4">
              <button type="submit" className="dashboard_primary_button " disabled={loading}>
                {loading ? "loading..." : "Submit"}
              </button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddCategory;
