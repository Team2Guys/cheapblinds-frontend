"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Formik,
  FormikErrors,
  Form,
  FormikHelpers,
  Field,
  ErrorMessage,
} from "formik";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { handleImageAltText, handleSort, ImageRemoveHandler } from "utils/helperFunctions";
import Toaster from "components/Toaster/Toaster";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FormValues } from "types/type";
import revalidateTag from "components/ServerActons/ServerAction";
import { IProductValues, ProductImage } from "types/prod";
import ImageUploader from "components/ImageUploader/ImageUploader";
import { DASHBOARD_ADD_SUBCATEGORIES_PROPS_PRODUCTFORMPROPS } from "types/PagesProps";
import { useMutation } from "@apollo/client";
import showToast from "components/Toaster/Toaster";
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { centerAspectCrop } from "types/product-crop";
import { useRouter } from "next/navigation";
import { AddproductsinitialValues } from "data/InitialValues";
import { AddProductvalidationSchema } from "data/Validations";
import { uploadPhotosToBackend } from "utils/fileUploadhandlers";
import { ISUBCATEGORY } from "types/cat";
import { Modal } from 'antd';
import { CREATE_PRODUCT, GET_ALL_PRODUCTS, UPDATE_PRODUCT } from "graphql/prod";
import { useSession } from "next-auth/react";


const initialErrors = {
  categoryError: "",
  subCategoryError: "",
  posterImageError: "",
  prodImages: "",
};

const AddProd: React.FC<DASHBOARD_ADD_SUBCATEGORIES_PROPS_PRODUCTFORMPROPS> = ({
  editProduct,
  EditProductValue,
  setselecteMenu,
  setEditProduct,
  categoriesList,
}) => {

  // const editProductFlag = editProduct?.type == "product"
  const [imagesUrl, setImagesUrl] = useState<ProductImage[] | undefined>((editProduct && editProduct?.productImages.length > 0) ? editProduct?.productImages : []);
  const [posterimageUrl, setposterimageUrl] = useState<ProductImage[] | undefined>(editProduct && editProduct.posterImageUrl ? [editProduct.posterImageUrl] : []);
  const [hoverImage, sethoverImage] = useState<ProductImage[] | undefined>(editProduct?.hoverImageUrl ? [{ ...editProduct.hoverImageUrl }] : undefined);

  const router = useRouter()

  const session = useSession()

  const [BannerImageUrl, setBannerImageUrl] = useState<ProductImage[] | undefined>(editProduct && editProduct?.Banners ? [editProduct?.Banners] : undefined);

  const [loading, setloading] = useState<boolean>(false);
  const [productInitialValue, setProductInitialValue] = useState<IProductValues | null | undefined>();
  const [imgError, setError] = useState<string | null | undefined>();
  const [selectedCategory, setSelectedCategory] = useState(editProduct ? editProduct.category.id : '');
  const [subcategories, setSubcategories] = useState<ISUBCATEGORY[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(editProduct?.subcategory?.id ?? '');
  const [categorySubCatError, setcategorySubCatError] = useState(initialErrors);
  const dragImage = useRef<number | null>(null);
  const draggedOverImage = useRef<number | null>(null);

  const [isCropModalVisible, setIsCropModalVisible] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const finalToken = session.data?.accessToken
  const [updateProduct] = useMutation(UPDATE_PRODUCT,
    {
      context: {
        fetchOptions: {
          credentials: "include",
        },
        headers: {
          authorization: `Bearer ${finalToken}`,
        }
      },
    }
  );

  const [createProduct] = useMutation(CREATE_PRODUCT,
    {
      context: {
        fetchOptions: {
          credentials: "include",
        },
        headers: {
          authorization: `Bearer ${finalToken}`,
        }
      },
    }
  );


  useEffect(() => {
    const CategoryHandler = async () => {
      try {
        const selectedCat = categoriesList?.find((cat) => cat.id === selectedCategory);
        setSubcategories(selectedCat?.subCategories || []);
        if (!editProduct) return;
        setImagesUrl((editProduct && EditProductValue?.productImages.length > 0) ? EditProductValue?.productImages : []);
        sethoverImage(editProduct?.hoverImageUrl ? [{ ...editProduct.hoverImageUrl }] : []);
        setProductInitialValue?.(() => EditProductValue);
      } catch (err) {
        throw err;
      }
    };

    CategoryHandler();
  }, [editProduct]);

  const onSubmit = async (values: IProductValues, { resetForm }: FormikHelpers<IProductValues>) => {
    try {
      setloading(true);
      setError("");
      setcategorySubCatError(initialErrors);
      if (!selectedCategory) {
        setcategorySubCatError((prev) => ({
          ...prev,
          categoryError: "Category is Required",
        }));
        return;
      }

      if (subcategories.length > 0 && !selectedSubcategory) {
        setcategorySubCatError((prev) => ({
          ...prev,
          subCategoryError: "Subcategory is Required",
        }));
        return;
      }

      const posterImageUrl = posterimageUrl && posterimageUrl[0];
      const hoverImageUrl = hoverImage && hoverImage[0];
      const Banner = BannerImageUrl && BannerImageUrl[0];

      if (!posterImageUrl) {
        setcategorySubCatError((prev) => ({
          ...prev,
          posterImageError: "Poster Image is Required",
        }));
        return;
      }

      if (!imagesUrl || !(imagesUrl.length > 0)) {
        setcategorySubCatError((prev) => ({
          ...prev,
          prodImages: "Please upload at least 1 product-relevant image",
        }));
        return;
      }




      const newValues = {
        ...values,
        posterImageUrl,
        hoverImageUrl,
        productImages: imagesUrl,
        Banners: Banner,
        category: +selectedCategory,
        subcategory: +selectedSubcategory,
        last_editedBy: session.data?.user.fullname
      };
      const updateFlag = EditProductValue && editProduct ? true : false;
      const { data } = updateFlag
        ? await updateProduct({
          variables: { input: { ...newValues, id: Number(editProduct?.id) } },
          refetchQueries: [{ query: GET_ALL_PRODUCTS }]
        })
        : await createProduct({
          variables: { input: newValues },
          refetchQueries: [{ query: GET_ALL_PRODUCTS }]
        });

      if (!data) {
        throw new Error("Mutation failed. No data returned.");
      }

      // ✅ Revalidate and show success message
      revalidateTag("products");
      Toaster(
        "success",
        updateFlag
          ? "Product has been successfully updated!"
          : "Product has been successfully added!"
      );

      resetForm();
      setloading(false);
      sethoverImage(undefined);
      setposterimageUrl(undefined);
      setImagesUrl([]);
      setselecteMenu("Add All Products");
      if (updateFlag) {
        setEditProduct?.(undefined);
      }
      /* eslint-disable */
    } catch (err: any) {
      if (err?.graphQLErrors?.length > 0) {
        if (err?.graphQLErrors[0].message === "Authentication required") {
          router.push("/dashboard/Admin-login")
        }
        setError(err?.graphQLErrors[0].message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setloading(false);
    }
    /* eslint-enable */
  };


  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = Number(e.target.value);
    setSelectedCategory(categoryId);
    const selectedCat = categoriesList?.find((cat) => cat.id === categoryId);
    setSubcategories(selectedCat?.subCategories || []);
    setSelectedSubcategory("");
  };

  const handleInnerSubCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const categoryId = Number(e.target.value);
    setSelectedSubcategory(categoryId)
  };

  const handleCropClick = (imageUrl: string) => {
    setImageSrc(imageUrl);
    setIsCropModalVisible(true);
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;
    const newCrop = centerAspectCrop(width, height, 16 / 9);
    setCrop(newCrop);
  };

  const onCropComplete = (crop: Crop) => {
    const image = imgRef.current;
    if (!image || !crop.width || !crop.height) return;

    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    const ctx = canvas.getContext('2d');

    canvas.width = crop.width;
    canvas.height = crop.height;

    if (ctx) {
      ctx.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );
    }

    const base64Image = canvas.toDataURL('image/jpeg');
    setCroppedImage(base64Image);
  };

  const handleCropModalOk = async () => {
    if (croppedImage && imageSrc) {
      try {
        // Convert the cropped image (base64) to a File
        const file = base64ToFile(croppedImage, `cropped_${Date.now()}.jpg`);

        // Upload the cropped image to your backend or Cloudinary
        const response = await uploadPhotosToBackend(file);
        if (!response) return

        // Use the base URL from your environment variables
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || '';
        const uploadedImageUrl = response[0].imageUrl;
        // Append the base URL if needed
        const newImageUrl = uploadedImageUrl.startsWith('http')
          ? uploadedImageUrl
          : `${baseUrl}${uploadedImageUrl}`;

        const newImage = { imageUrl: newImageUrl, public_id: response[0].public_id };

        // First close the modal and reset croppedImage
        setIsCropModalVisible(false);
        setCroppedImage(null);

        // Use a timeout to update states after the modal has closed
        setTimeout(() => {
          setposterimageUrl((prevImages) =>
            prevImages?.map((img) =>
              img.imageUrl === imageSrc ? { ...img, ...newImage } : img
            )
          );
          sethoverImage((prevImages) =>
            prevImages?.map((img) =>
              img.imageUrl === imageSrc ? { ...img, ...newImage } : img
            )
          );
          setImagesUrl((prevImages) =>
            prevImages?.map((img) =>
              img.imageUrl === imageSrc ? { ...img, ...newImage } : img
            )
          );
        }, 0);
      } catch {
        showToast('error', 'Failed to upload cropped image');
      }
    }
  };

  // Helper function to convert a base64 string to a File object
  const base64ToFile = (base64: string, filename: string): File => {
    const arr = base64.split(',');
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };


  const handleCropModalCancel = () => {
    setIsCropModalVisible(false);
    setCroppedImage(null);
  };


  const handleBack = (values: IProductValues) => {
    const initialFormValues = productInitialValue || AddproductsinitialValues;

    let isPosterChanged: boolean;
    let isBannerChanged: boolean;
    let isProductImagesChanged: boolean;
    let isHoverImageChanged: boolean;

    if (editProduct) {
      // Editing mode
      isPosterChanged =
        JSON.stringify(editProduct.posterImageUrl ? [editProduct.posterImageUrl] : undefined) !== JSON.stringify(posterimageUrl);

      isBannerChanged =
        JSON.stringify(editProduct.Banners ? [editProduct.Banners] : undefined) !== JSON.stringify(BannerImageUrl);

      isProductImagesChanged =
        JSON.stringify((editProduct?.productImages.length > 0) ? editProduct?.productImages : []) !== JSON.stringify(imagesUrl);

      isHoverImageChanged =
        JSON.stringify((editProduct?.hoverImageUrl) ? editProduct?.hoverImageUrl : null) !== JSON.stringify((hoverImage && hoverImage.length > 0) ? hoverImage : null);
    } else {
      // Adding mode (initially no images)
      isPosterChanged = !!posterimageUrl && posterimageUrl.length > 0;
      isBannerChanged = !!BannerImageUrl && BannerImageUrl.length > 0;
      isProductImagesChanged = !!imagesUrl && imagesUrl.length > 0;
      isHoverImageChanged = !!hoverImage && hoverImage.length > 0;
    }
    // eslint-disable-next-line
    const isFormChanged = JSON.stringify({ ...initialFormValues, category: initialFormValues.category === '' ? initialFormValues.category : Number((initialFormValues.category as any).id), subcategory: initialFormValues.subcategory === '' ? initialFormValues.subcategory : Number((initialFormValues.subcategory as any).id) }) !== JSON.stringify({ ...values, category: selectedCategory === '' ? selectedCategory : Number(selectedCategory), subcategory: selectedSubcategory === '' ? selectedSubcategory : Number(selectedSubcategory) });

    if (isPosterChanged || isBannerChanged || isProductImagesChanged || isHoverImageChanged || isFormChanged) {
      Modal.confirm({
        title: "Unsaved Changes",
        content: "You have unsaved changes. Do you want to discard them?",
        okText: "Discard Changes",
        cancelText: "Cancel",
        onOk: () => {
          setselecteMenu("Add All Products");
          setEditProduct?.(() => undefined);
        },
      });
      return;
    }
    setselecteMenu("Add All Products");
    setEditProduct?.(() => undefined);
    return;
  };



  return (


    <Formik
      enableReinitialize
      initialValues={
        productInitialValue ? { ...productInitialValue, category: Number(editProduct?.category?.id), subcategory: Number(editProduct?.subcategory?.id) } : AddproductsinitialValues
      }
      validationSchema={AddProductvalidationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (


          <Form onSubmit={formik.handleSubmit}>


            <div className='flex flex-wrap mb-5 gap-2 justify-between items-center'>
              <p
                className="dashboard_primary_button"
                onClick={() => handleBack(formik.values)}
              >
                <IoMdArrowRoundBack /> Back
              </p>
              <div className="flex justify-center gap-4">
                <Field name="status">
                  {({ field, form }: import('formik').FieldProps) => (
                    <div className="flex gap-4 items-center border-r-2 dark:border-white px-2">

                      {['DRAFT', 'PUBLISHED'].map((status) => {
                        const isActive = field.value === status;

                        return (
                          <button
                            key={status}
                            type="button"
                            onClick={() => form.setFieldValue('status', status)}
                            disabled={isActive}
                            className={`px-4 py-2 rounded-md text-sm
                                ${isActive
                                ? 'dashboard_primary_button cursor-not-allowed'
                                : 'bg-white text-black cursor-pointer'
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
                  {loading ? "loading.." : 'Submit'}
                </button>
              </div>
            </div>


            <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
              <div className="flex flex-col gap-9 ">
                <div className="rounded-sm border border-stroke bg-white dark:bg-black/50 backdrop-blur-3xl p-4 xs:p-6">
                  <div className="rounded-sm border border-stroke ">
                    <div className="border-b border-stroke py-4 px-4 ">
                      <h3 className="font-medium text-black dark:text-white">
                        Add Poster Image
                      </h3>
                    </div>

                    {posterimageUrl && posterimageUrl?.length > 0 ? (
                      <div className="p-3">
                        {posterimageUrl.map((item: ProductImage, index) => {
                          return (
                            <div key={index}>
                              <div className="relative group rounded-lg overflow-hidden shadow-md  transform transition-transform duration-300 hover:scale-105">
                                <div className="absolute top-1 right-1 invisible group-hover:visible text-red  rounded-full">
                                  <RxCross2
                                    className="cursor-pointer border border-black text-red-500 dark:text-red-700"
                                    size={17}
                                    onClick={() => {
                                      ImageRemoveHandler(
                                        item.public_id,
                                        setposterimageUrl,
                                        // finalToken
                                      );
                                    }}
                                  />
                                </div>
                                <Image
                                  onClick={() => handleCropClick(item.imageUrl)}
                                  key={index}
                                  className="object-cover cursor-crosshair"
                                  width={300}
                                  height={400}
                                  loading="lazy"
                                  src={item?.imageUrl || ""}
                                  alt={`productImage-${index}`}
                                />
                              </div>
                              <div className="my-7 space-y-3">
                                <input
                                  className="dashboard_input"
                                  placeholder="altText"
                                  type="text"
                                  name="altText"
                                  value={item?.altText || ""}
                                  onChange={(e) =>
                                    handleImageAltText(
                                      index,
                                      String(e.target.value),
                                      setposterimageUrl,
                                      "altText"
                                    )
                                  }
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <ImageUploader setImagesUrl={setposterimageUrl} />
                    )}
                  </div>
                  {categorySubCatError.posterImageError ? (
                    <p className="text-red-500">
                      {categorySubCatError.posterImageError}
                    </p>
                  ) : null}

                  <div className="flex flex-col ">

                    <label className="primary-label">
                      Product Title
                    </label>

                    <Field
                      type="text"
                      name="name"
                      placeholder="Title"
                      className={`dashboard_input ${formik.touched.name && formik.errors.name
                        ? "border-red-500"
                        : ""
                        }`}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500 dark:text-red-700 text-sm"
                    />

                    {/* Custom url and BreadkCrum */}
                    <div className="flex gap-3">
                      <div>
                        <label className="primary-label  ">
                          Custom Url
                        </label>
                        <Field
                          type="text"
                          name="custom_url"
                          placeholder="Title"
                          className={`primary-input ${formik.touched.custom_url && formik.errors.custom_url
                            ? "border-red-500"
                            : ""
                            }`}
                        />

                      </div>

                      <div className=" ">
                        <label className="primary-label ">
                          breadCrum
                        </label>

                        <Field
                          type="text"
                          name="breadCrum"
                          placeholder="breadCrum"

                          className="primary-input"
                        />

                        <ErrorMessage
                          name="breadCrum"
                          component="div"
                          className="text-red-500 dark:text-red-700 text-sm"
                        />
                      </div>
                    </div>





                    <label className="primary-label ">
                      Description
                    </label>
                    <textarea
                      name="description"
                      onChange={formik.handleChange}
                      value={formik.values.description}
                      placeholder="description"
                      className={`primary-input ${formik.touched.description &&
                        formik.errors.description
                        ? "border-red-500"
                        : ""
                        }`}
                    />
                    {formik.touched.description &&
                      formik.errors.description ? (
                      <div className="text-red-500 dark:text-red-700 text-sm">
                        {
                          formik.errors.description as FormikErrors<
                            FormValues["description"]
                          >
                        }
                      </div>
                    ) : null}


                    <label className="primary-label ">
                      Short Description{" "}
                    </label>
                    <textarea
                      name="short_description"
                      onChange={formik.handleChange}
                      value={formik.values.short_description}
                      placeholder="short description"
                      className={`primary-input ${formik.touched.short_description &&
                        formik.errors.short_description
                        ? "border-red-500"
                        : ""
                        }`}
                    />
                    {formik.touched.short_description &&
                      formik.errors.short_description ? (
                      <div className="text-red-500 dark:text-red-700 text-sm">
                        {
                          formik.errors.short_description as FormikErrors<
                            FormValues["short_description"]
                          >
                        }
                      </div>
                    ) : null}


                    <div className="flex full items-center gap-4">
                      <div className="w-1/3 xs:w-1/3">
                        <label className="primary-label ">
                          Price
                        </label>
                        <input
                          type="number"
                          name="price"
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          value={formik.values.price}
                          placeholder="Product Price"
                          min="0"
                          className={`primary-input ${formik.touched.price && formik.errors.price
                            ? "border-red-500"
                            : ""
                            }`}
                        />
                        {formik.touched.price && formik.errors.price ? (
                          <div className="text-red-500 dark:text-red-700 text-sm">
                            {" "}
                            {
                              formik.errors.price as FormikErrors<
                                FormValues["price"]
                              >
                            }
                          </div>
                        ) : null}
                      </div>

                      <div className="w-1/3 xs:w-1/3">
                        <label className="primary-label ">
                          Discount Price
                        </label>
                        <Field
                          type="number"
                          name="discountPrice"
                          placeholder="Discounted Price"
                          min="0"
                          className={`primary-input ${formik.touched.discountPrice &&
                            formik.errors?.discountPrice
                            ? "border-red-500"
                            : ""
                            }`}
                        />

                        <ErrorMessage
                          name="discountPrice"
                          component="div"
                          className="text-red-500 dark:text-red-700 text-sm"
                        />
                      </div>

                      <div className="w-1/3 xs:w-1/3 ">
                        <label className="primary-label ">
                          Stock
                        </label>

                        <Field
                          type="number"
                          name="stock"
                          placeholder="How many items available"
                          min="0"
                          className="primary-input"
                        />

                        <ErrorMessage
                          name="stock"
                          component="div"
                          className="text-red-500 dark:text-red-700 text-sm"
                        />
                      </div>
                    </div>

                    <div className="mt-4 space-y-4">
                      <div className="flex gap-4">
                        <div className="w-2/4">
                          <label className="primary-label ">
                            Meta Title
                          </label>
                          <input
                            type="text"
                            name="Meta_Title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.Meta_Title}
                            placeholder="Meta Title"
                            className={`primary-input ${formik.touched.name && formik.errors.name
                              ? "border-red-500"
                              : ""
                              }`}
                          />
                          {formik.touched.Meta_Title &&
                            formik.errors.Meta_Title ? (
                            <div className="text-red text-sm">
                              {formik.errors.Meta_Title as string}
                            </div>
                          ) : null}
                        </div>
                        <div className="w-2/4">
                          <label className="primary-label ">
                            Canonical Tag
                          </label>
                          <input
                            onBlur={formik.handleBlur}
                            type="text"
                            name="Canonical_Tag"
                            onChange={formik.handleChange}
                            value={formik.values.Canonical_Tag}
                            placeholder="Canonical Tag"
                            className={`primary-input ${formik.touched.name && formik.errors.name
                              ? "border-red-500"
                              : ""
                              }`}
                          />

                          {formik.touched.Canonical_Tag &&
                            formik.errors.Canonical_Tag ? (
                            <div className="text-red text-sm">
                              {formik.errors.Canonical_Tag as string}
                            </div>
                          ) : null}
                        </div>
                      </div>

                      <div>
                        <label className="primary-label ">
                          Meta Description
                        </label>
                        <textarea
                          name="Meta_Description"
                          onChange={formik.handleChange}
                          value={formik.values.Meta_Description}
                          placeholder="Meta Description"
                          className={`primary-input ${formik.touched.description &&
                            formik.errors.description
                            ? "border-red-500"
                            : ""
                            }`}
                        />
                        {formik.touched.Meta_Description &&
                          formik.errors.Meta_Description ? (
                          <div className="text-red text-sm">
                            {formik.errors.Meta_Description as string}
                          </div>
                        ) : null}
                      </div>
                    </div>

                    <div>
                      <label className="primary-label ">
                        seoSchema
                      </label>
                      <textarea
                        name="seoSchema"
                        onChange={formik.handleChange}
                        value={formik.values.seoSchema}
                        placeholder="seoSchema"
                        className={`primary-input ${formik.touched.seoSchema &&
                          formik.errors.seoSchema
                          ? "border-red-500"
                          : ""
                          }`}
                      />

                    </div>

                    <div className="flex gap-4 flex-col">
                      <div className="w-full">
                        <label className="primary-label ">
                          Select Categories & Sub Categories
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <select
                            name="category"
                            value={selectedCategory ? selectedCategory : ''}
                            onChange={handleCategoryChange}
                            className="dashboard_input"
                          >
                            <option value="" disabled className="">
                              Select Category
                            </option>
                            {categoriesList?.map((category) => (
                              <option key={category.id} value={category.id}>
                                {category.name}
                              </option>
                            ))}
                          </select>

                          {categorySubCatError.categoryError ? (
                            <p className="text-red-500">
                              {categorySubCatError.categoryError}
                            </p>
                          ) : null}
                        </div>

                        {/* Subcategory Selection */}

                        {subcategories.length > 0 && (
                          <div className="mt-4">
                            <h2 className="primary-label">
                              Subcategories
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <select
                                name="subcategory"
                                value={selectedSubcategory}
                                onChange={
                                  handleInnerSubCategoryChange
                                }
                                className="dashboard_input"
                              >
                                <option value="" disabled>
                                  Select Subcategory
                                </option>
                                {subcategories.map(
                                  (subCat: ISUBCATEGORY) => (
                                    <option key={subCat.id} value={subCat.id}>
                                      {subCat.name}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>
                        )}

                        {categorySubCatError.subCategoryError ? (
                          <p className="text-red-500">
                            {categorySubCatError.subCategoryError}
                          </p>
                        ) : null}




                      </div>


                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5 rounded-sm border border-stroke bg-white dark:bg-black/50 backdrop-blur-3xl p-4 xs:p-6 h-fit">
                <div className="rounded-sm border border-stroke ">
                  <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Add Hover Image
                    </h3>
                  </div>

                  {hoverImage && hoverImage.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                      {hoverImage.map((item: ProductImage, index) => {
                        return (
                          <div key={index}>
                            <div className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105">
                              <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full">
                                <RxCross2
                                  className="cursor-pointer text-red-500 dark:text-red-700"
                                  size={17}
                                  onClick={() => {
                                    ImageRemoveHandler(
                                      item.public_id,
                                      sethoverImage,
                                      // finalToken
                                    );
                                  }}
                                />
                              </div>
                              <Image
                                onClick={() => handleCropClick(item.imageUrl)}
                                key={index}
                                className="object-cover w-full h-full md:h-32 dark:bg-black dark:shadow-lg cursor-crosshair"
                                width={100}
                                height={100}
                                loading="lazy"
                                src={item?.imageUrl ? item?.imageUrl : ""}
                                alt={`productImage-${index}`}
                              />
                            </div>
                            <input
                              className="dashboard_input"
                              placeholder="altText"
                              type="text"
                              name="altText"
                              value={item?.altText || ""}
                              onChange={(e) =>
                                handleImageAltText(
                                  index,
                                  String(e.target.value),
                                  sethoverImage,
                                  "altText"
                                )
                              }
                            />
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <ImageUploader setImagesUrl={sethoverImage} />
                  )}
                </div>

                <div className="rounded-sm border border-stroke dark:border-strokedark ">
                  <div className="border-b border-stroke py-4 px-2  ">
                    <h3 className="font-medium text-black dark:text-white">
                      Add Banner Image / Video
                    </h3>
                  </div>
                  {BannerImageUrl?.[0] && BannerImageUrl?.length > 0 ? (
                    <div className=" p-4">
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
                                    // finalToken
                                  );
                                }}
                              />
                            </div>

                            {item.resource_type == "video" ?

                              <video
                                key={index}
                                src={item?.imageUrl || ""}
                                height={200} width={200}
                                className="w-full h-full max-h-[300] max-w-full dark:bg-black dark:shadow-lg"
                                autoPlay
                                muted
                                controls

                              >


                              </video>


                              :
                              <>

                                <Image
                                  onClick={() => handleCropClick(item.imageUrl)}
                                  key={index}
                                  className="w-full h-full dark:bg-black dark:shadow-lg cursor-crosshair"

                                  width={200}
                                  height={500}
                                  loading='lazy'
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
                                      "altText"
                                    )
                                  }
                                />
                              </>
                            }
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <ImageUploader setImagesUrl={setBannerImageUrl} video s3Flag />
                  )}
                </div>




                <div className="rounded-sm border border-stroke ">
                  <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                    <h3 className="font-medium text-black dark:text-white">
                      Add Product Images
                    </h3>
                  </div>

                  <ImageUploader setImagesUrl={setImagesUrl} multiple />
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 p-4">
                    {imagesUrl && imagesUrl.length > 0 ? (
                      imagesUrl.map((item: ProductImage, index) => {
                        return (
                          <div
                            key={index}
                            draggable
                            onDragStart={() => (dragImage.current = index)}
                            onDragEnter={() =>
                              (draggedOverImage.current = index)
                            }
                            onDragEnd={() => handleSort(imagesUrl, dragImage, draggedOverImage, setImagesUrl)}
                            onDragOver={(e) => e.preventDefault()}
                            className="space-y-3"
                          >
                            <div className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105">
                              <div
                                className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full"
                                draggable
                              >
                                <RxCross2
                                  className="cursor-pointer text-red-500 dark:text-red-700"
                                  size={17}
                                  onClick={() => {
                                    ImageRemoveHandler(
                                      item.public_id,
                                      setImagesUrl,
                                      // finalToken
                                    );
                                  }}
                                />
                              </div>
                              <Image
                                onClick={() => handleCropClick(item.imageUrl)}
                                key={index}
                                className="object-cover w-full h-full md:h-32 dark:bg-black dark:shadow-lg cursor-crosshair"
                                width={300}
                                height={200}
                                loading="lazy"
                                src={item?.imageUrl || ""}
                                alt={`productImage-${index}` || ""}
                              />
                            </div>

                            <input
                              className="dashboard_input"
                              placeholder="altText"
                              type="text"
                              name="altText"
                              value={item?.altText || ""}
                              onChange={(e) =>
                                handleImageAltText(
                                  index,
                                  String(e.target.value),
                                  setImagesUrl,
                                  "altText"
                                )
                              }
                            />
                          </div>
                        );
                      })
                    ) : null}
                  </div>
                </div>
                {categorySubCatError.prodImages ? (
                  <p className="text-red-500">
                    {categorySubCatError.prodImages}
                  </p>
                ) : null}

              </div>


            </div>

            {
              imgError ? (
                <div className="flex justify-center">
                  <div className="text-red-500 pt-2 pb-2">{imgError}</div>
                </div>
              ) : null
            }
            <Field name="status">
              {({ field, form }: import('formik').FieldProps) => (
                <div className="flex gap-4 items-center my-4">
                  <label className="font-semibold dark:text-white">Product Status:</label>

                  {['DRAFT', 'PUBLISHED'].map((status) => {
                    const isActive = field.value === status;

                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => form.setFieldValue('status', status)}
                        disabled={isActive}
                        className={`px-4 py-2 rounded-md text-sm
                          ${isActive
                            ? 'dashboard_primary_button cursor-not-allowed'
                            : 'bg-white text-black cursor-pointer'
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
              className="dashboard_primary_button"
              disabled={loading}
            >
              {loading ? "loading..." : "Submit"}
            </button>
            <Modal
              title="Crop Image"
              open={isCropModalVisible}
              onOk={handleCropModalOk}
              onCancel={handleCropModalCancel}
              width={500}
              height={400}
            >
              {imageSrc && (
                <ReactCrop
                  crop={crop}
                  onChange={(newCrop) => setCrop(newCrop)}
                  onComplete={onCropComplete}
                >
                  <Image
                    width={500}
                    height={300}
                    ref={imgRef}
                    src={imageSrc}
                    alt="Crop me"
                    style={{ maxWidth: '100%' }}
                    onLoad={onImageLoad}
                    crossOrigin="anonymous"
                  />
                </ReactCrop>
              )}
            </Modal>
          </Form>
        );
      }}
    </Formik >

  );
};

export default AddProd;