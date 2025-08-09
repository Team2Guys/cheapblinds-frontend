"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Formik,
  FieldArray,
  FormikErrors,
  Form,
  FormikHelpers,
  Field,
  ErrorMessage,
} from "formik";
import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import { handleImageAltText, handleSort, ImageRemoveHandler, removedValuesHandler } from "utils/helperFunctions";
import Toaster from "components/Toaster/Toaster";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FormValues } from "types/type";
import revalidateTag from "components/ServerActons/ServerAction";
import { AdditionalInformation, IProductValues, ISizes, ProductImage, Shipping } from "types/prod";
import ImageUploader from "components/ImageUploader/ImageUploader";
import { DASHBOARD_ADD_SUBCATEGORIES_PROPS_PRODUCTFORMPROPS } from "types/PagesProps";
import { useMutation } from "@apollo/client";
import {
  CREATE_PRODUCT,
  UPDATE_PRODUCT,
} from "graphql/mutations";
import { CREATE_ECOMERECE_PRODUCT, UPDATE_ECOMERECE_PRODUCTS } from "graphql/Accessories";
import showToast from "components/Toaster/Toaster";
import ReactCrop, { Crop } from 'react-image-crop';
import { centerAspectCrop } from "types/product-crop";
import { useRouter } from "next/navigation";
import { AddproductsinitialValues } from "data/InitialValues";
import { AddProductvalidationSchema } from "data/Validations";
import { uploadPhotosToBackend } from "utils/fileUploadhandlers";
import { INNERSUBCATEGORY, ISUBCATEGORY } from "types/cat";
import { Checkbox, Modal } from 'antd';
import { shippingOption } from "data/data";
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
  ecomerece,
}) => {

  const editProductFlag = editProduct?.type == "product"
  const [imagesUrl, setImagesUrl] = useState<ProductImage[] | undefined>((editProduct && editProduct?.productImages.length > 0) ? editProduct?.productImages : []);
  //@ts-expect-error('same components,')
  const [selectedShippingOption, setSelectedShippingOption] = useState<Shipping[]>((editProduct && editProduct?.shippingOptions && editProduct?.shippingOptions?.length > 0) ? editProduct?.shippingOptions : []);

  const [posterimageUrl, setposterimageUrl] = useState<ProductImage[] | undefined>(editProduct && editProduct.posterImageUrl ? [editProduct.posterImageUrl] : []);
  const [hoverImage, sethoverImage] = useState<ProductImage[] | undefined>(editProduct?.hoverImageUrl ? [{ ...editProduct.hoverImageUrl }] : []);

  const [left_side_image, setleft_side_image] = useState<ProductImage[] | undefined>(editProductFlag && editProduct?.left_side_image ? [editProduct.left_side_image] : undefined);

  const router = useRouter()
  const [featureImagesimagesUrl, setfeatureImagesImagesUrl] = useState<ProductImage[] | undefined>(editProductFlag && editProduct?.categoryHeroImages ?
    editProduct?.categoryHeroImages : []);


  const [BannerImageUrl, setBannerImageUrl] = useState<ProductImage[] | undefined>(editProduct && editProduct?.Banners ? [editProduct?.Banners] : undefined);

  const [loading, setloading] = useState<boolean>(false);
  const [productInitialValue, setProductInitialValue] = useState<IProductValues | null | undefined>();
  const [imgError, setError] = useState<string | null | undefined>();
  const [selectedCategory, setSelectedCategory] = useState(editProduct ? editProduct.category.id : categoriesList?.[0]?.id);
  const [subcategories, setSubcategories] = useState<ISUBCATEGORY[]>([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(() =>
    editProduct?.subcategory?.id ??
    categoriesList?.[0]?.subcategory?.id ??
    ''
  );
  const [selecteInnerdSubcategory, setInnerSelectedSubcategory] = useState(EditProductValue ? EditProductValue?.Innersubcategory : "");
  const [Innersubcategories, setInnersubcategories] = useState<INNERSUBCATEGORY[]>([]);
  const [categorySubCatError, setcategorySubCatError] = useState(initialErrors);
  const dragImage = useRef<number | null>(null);
  const dragFeatureImage = useRef<number | null>(null);


  const draggedOverImage = useRef<number | null>(null);
  const draggedOverfeatureImage = useRef<number | null>(null);

  const session = useSession()
  const finalToken = session.data?.accessToken;
  console.log(finalToken, 'finalToken')
  const [isCropModalVisible, setIsCropModalVisible] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [updateProduct] = useMutation(
    ecomerece ? UPDATE_ECOMERECE_PRODUCTS : UPDATE_PRODUCT,
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

  const [createProduct] = useMutation(ecomerece ? CREATE_ECOMERECE_PRODUCT : CREATE_PRODUCT, {
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

  function handleFeatreSort() {
    if (dragFeatureImage.current === null || draggedOverfeatureImage.current === null) return;

    const imagesClone = featureImagesimagesUrl && featureImagesimagesUrl.length > 0 ? [...featureImagesimagesUrl] : [];

    const temp = imagesClone[dragFeatureImage.current];
    imagesClone[dragFeatureImage.current] = imagesClone[draggedOverfeatureImage.current];
    imagesClone[draggedOverfeatureImage.current] = temp;

    setfeatureImagesImagesUrl(imagesClone);
  }

  useEffect(() => {
    const CategoryHandler = async () => {
      try {
        const selectedCat = categoriesList?.find((cat) => cat.id === selectedCategory);
        setSubcategories(selectedCat?.subCategories || []);
        if (selectedCat?.subCategories > 0) {

          const subCategories: ISUBCATEGORY | undefined = selectedCat?.subCategories?.find((cat: ISUBCATEGORY) => cat?.id === selectedCategory);
          if (!subCategories) return
          setInnersubcategories(subCategories?.InnersubCategories || []);

        }
        if (!editProduct) return;
        setImagesUrl((editProduct && EditProductValue?.productImages.length > 0) ? EditProductValue?.productImages : []);
        sethoverImage(editProduct?.hoverImageUrl ? [{ ...editProduct.hoverImageUrl }] : []);
        setProductInitialValue?.(() => EditProductValue);
        setfeatureImagesImagesUrl(editProductFlag && editProduct?.categoryHeroImages ? editProduct?.categoryHeroImages : []);
      } catch (err) {
        throw err;
      }
    };

    CategoryHandler();
  }, [editProduct]);

  const onSubmit = async (changedValue: IProductValues, { resetForm }: FormikHelpers<IProductValues>) => {
    try {
      const values = removedValuesHandler(changedValue, ecomerece);
      setError("");
      setcategorySubCatError(initialErrors);
      if (!selectedCategory) {
        setcategorySubCatError((prev) => ({
          ...prev,
          categoryError: "Category is Required",
        }));
        return;
      }

      if (subcategories.length > 0 && !selectedSubcategory && !ecomerece) {
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

      const images = {
        Innersubcategory: +selecteInnerdSubcategory,
        categoryHeroImages: featureImagesimagesUrl,
        left_side_image: left_side_image?.[0]
      };



      const newValues = {
        ...values,
        posterImageUrl,
        hoverImageUrl,
        productImages: imagesUrl,
        Banners: Banner,
        category: +selectedCategory,
        subcategory: +selectedSubcategory,
      };

      if (!ecomerece) {
        Object.assign(newValues, images);
      }

      if (ecomerece) {
        Object.assign(newValues, { shippingOptions: selectedShippingOption });
      }

      setloading(true);
      const updateFlag = EditProductValue && editProduct ? true : false;
      const { data } = updateFlag
        ? await updateProduct({
          variables: { input: { ...newValues, id: Number(editProduct?.id) } },
        })
        : await createProduct({ variables: { input: newValues } });

      if (!data) {
        throw new Error("Mutation failed. No data returned.");
      }

      // ✅ Revalidate and show success message
      revalidateTag(ecomerece ? "Ecomerece" : "products");
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
      setfeatureImagesImagesUrl([]);
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
    const categoryId = e.target.value;
    setSelectedSubcategory(categoryId)
    const selectedCat: ISUBCATEGORY | undefined = subcategories?.find((cat: ISUBCATEGORY) => String(cat?.id) === categoryId);
    if (!selectedCat) return
    setInnersubcategories(selectedCat?.InnersubCategories || []);
    setInnerSelectedSubcategory("");
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
          setfeatureImagesImagesUrl((prevImages) =>
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
                onClick={() => {
                  setselecteMenu("Add All Products");
                  setEditProduct?.(() => undefined);
                }}
              >
                <IoMdArrowRoundBack /> Back
              </p>
              <div className="flex justify-center gap-4">
                <Field name="status">
                  {({ field, form }: import('formik').FieldProps) => (
                    <div className="flex gap-4 items-center border-r-2 px-2">

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
                                : 'bg-white text-black border-gray-300 hover:bg-gray-100 cursor-pointer'
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
                <div className="rounded-sm border border-stroke  py-4 px-6">
                  <div className="rounded-sm border border-stroke ">
                    <div className="border-b border-stroke py-4 px-4 ">
                      <h3 className="font-medium ">
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
                                    className="cursor-pointer border border-black  text-red-500 dark:text-red-700"
                                    size={17}
                                    onClick={() => {
                                      ImageRemoveHandler(
                                        item.public_id,
                                        setposterimageUrl,
                                        finalToken
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
                                  className="primary-input"
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
                                <input
                                  className="primary-input"
                                  placeholder="Location"
                                  type="text"
                                  name="location"
                                  value={item?.location || ""}
                                  onChange={(e) =>
                                    handleImageAltText(
                                      index,
                                      String(e.target.value),
                                      setposterimageUrl,
                                      "location"
                                    )
                                  }
                                />
                                <input
                                  className="primary-input"
                                  placeholder="Material"
                                  type="text"
                                  name="Material"
                                  value={item?.Material || ""}
                                  onChange={(e) =>
                                    handleImageAltText(
                                      index,
                                      String(e.target.value),
                                      setposterimageUrl,
                                      "Material"
                                    )
                                  }
                                />
                                <input
                                  className="primary-input"
                                  placeholder="plankWidth"
                                  type="text"
                                  name="plankWidth"
                                  value={item?.plankWidth || ""}
                                  onChange={(e) =>
                                    handleImageAltText(
                                      index,
                                      String(e.target.value),
                                      setposterimageUrl,
                                      "plankWidth"
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

                    <label className="primary-label ">
                      Product Title
                    </label>

                    <Field
                      type="text"
                      name="name"
                      placeholder="Title"
                      className={`primary-input ${formik.touched.name && formik.errors.name
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
                      description{" "}
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


                    {!ecomerece &&
                      <>
                        <div className='flex gap-0 sm:gap-10 flex-wrap sm:flex-nowrap'>
                          <div className='w-full'>
                            <label className=" block py-4 px-2 text-sm font-medium text-white">
                              Banner Text
                            </label>
                            <Field
                              type="text"
                              name="BannerText"
                              placeholder="Custom URL"
                              className={`primary-input ${formik.touched.BannerText && formik.errors.BannerText ? "red_border" : ""}`}
                            />
                            <ErrorMessage name="custom_url" component="div" className="text-red-500 text-sm" />

                          </div>

                          <div className='w-full '>
                            <label className="block py-4 px-2 text-sm font-medium text-white">
                              Banner Heading
                            </label>
                            <Field
                              type="text"
                              name="BannerHeading"
                              placeholder="BannerHeading"
                              className={`primary-input ${formik.touched.BannerHeading && formik.errors.BannerHeading ? "red_border" : ""
                                }`}
                            />
                            <ErrorMessage name="BannerHeading" component="div" className="text-red-500 text-sm" />
                          </div>


                        </div>

                        {/* WINDOW cOVERING AFTER HERO SECTIONS */}
                        <div className="rounded-sm border border-stroke bg-primary mt-5">
                          <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
                            <h3 className="font-medium  dark:text-white">
                              categoryHeroText (Window Treatments)

                            </h3>
                          </div>



                          <div className="flex flex-col py-4 px-2">
                            <FieldArray name="categoryHeroText">
                              {({ push, remove }) => (
                                <div className="flex flex-col gap-2">
                                  {formik.values.categoryHeroText &&
                                    formik.values.categoryHeroText.map((model: AdditionalInformation, index: number) => (
                                      <div
                                        key={index}
                                        className="flex items-center gap-2"
                                      >
                                        <input
                                          type="text"
                                          name={`categoryHeroText[${index}].name`}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik?.values?.categoryHeroText[index].name}
                                          placeholder="Heading name"
                                          className="primary-input"
                                        />
                                        <input
                                          type="text"
                                          name={`categoryHeroText[${index}].detail`}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.categoryHeroText[index].detail}
                                          placeholder="details text"
                                          className="primary-input"
                                        />
                                        <button
                                          type="button"
                                          onClick={() => remove(index)}
                                          className=" text-red-500 "
                                        >
                                          <RxCross2
                                            className="text-red-500"
                                            size={25}
                                          />
                                        </button>
                                      </div>
                                    )
                                    )}
                                  <button
                                    type="button"
                                    onClick={() => push({ name: "", detail: "" })}
                                    className="px-4 py-2 hover:bg-primary border-white border cursor-pointer rounded-md shadow-md w-fit"
                                  >
                                    After Hero Section
                                  </button>
                                </div>
                              )}
                            </FieldArray>
                          </div>




                          <div className="input_container">
                            <div className="input_iner_container">
                              <label className="mb-3 block text-sm font-medium  text-white">
                                categoryHeroToptext
                              </label>
                              <textarea

                                name="categoryHeroToptext"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.categoryHeroToptext}
                                placeholder="categoryHeroToptext"
                                className={`primary-input ${formik.touched.categoryHeroToptext &&
                                  formik.errors.categoryHeroToptext
                                  ? 'red_border'
                                  : ''
                                  }`}
                              />

                            </div>

                            <div className="input_iner_container">
                              <label className="mb-3 block text-sm font-medium text-white">
                                categoryHeroHeading
                              </label>
                              <textarea
                                onBlur={formik.handleBlur}

                                name="categoryHeroHeading"
                                onChange={formik.handleChange}
                                value={formik.values.categoryHeroHeading}
                                placeholder="categoryHeroHeading"
                                className={`primary-input ${formik.touched.categoryHeroHeading &&
                                  formik.errors.categoryHeroHeading
                                  ? 'red_border'
                                  : ''
                                  }`}
                              />
                            </div>
                          </div>

                          <div className="rounded-sm border border-stroke bg-primary mt-5">


                            <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
                              <h3 className="font-medium  dark:text-white">
                                FAQS Details(window Covering)
                              </h3>
                            </div>


                            <div className="flex flex-col py-4 px-2">
                              <FieldArray name="categoryFaqs">
                                {({ push, remove }) => (
                                  <div className="flex flex-col gap-2">
                                    {formik.values.categoryFaqs &&
                                      formik.values.categoryFaqs.map((model: AdditionalInformation, index: number) => (
                                        <div
                                          key={index}
                                          className="flex items-center gap-2"
                                        >
                                          <input
                                            type="text"
                                            name={`categoryFaqs[${index}].name`}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik?.values?.categoryFaqs[index].name}
                                            placeholder="Heading name"
                                            className="primary-input"
                                          />
                                          <input
                                            type="text"
                                            name={`categoryFaqs[${index}].detail`}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.categoryFaqs[index].detail}
                                            placeholder="details text"
                                            className="primary-input"
                                          />
                                          <button
                                            type="button"
                                            onClick={() => remove(index)}
                                            className=" text-red-500 "
                                          >
                                            <RxCross2
                                              className="text-red-500"
                                              size={25}
                                            />
                                          </button>
                                        </div>
                                      )
                                      )}
                                    <button
                                      type="button"
                                      onClick={() => push({ name: "", detail: "" })}
                                      className="px-4 py-2 hover:bg-primary border-white border cursor-pointer rounded-md shadow-md w-fit"
                                    >
                                      FAQ Details
                                    </button>
                                  </div>
                                )}
                              </FieldArray>
                            </div>


                          </div>

                        </div>

                        {/* After instalation Section */}

                        <div className="input_container">
                          <div className="input_iner_container">
                            <label className="mb-3 block text-sm font-medium text-white">
                              explore_Heading
                            </label>
                            <input
                              type="text"
                              name="explore_Heading"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.explore_Heading}
                              placeholder="explore_Heading"
                              className={`primary-input ${formik.touched.explore_Heading &&
                                formik.errors.explore_Heading
                                ? 'red_border'
                                : ''
                                }`}
                            />

                          </div>

                          <div className="input_iner_container">
                            <label className="mb-3 block text-sm font-medium text-white">
                              explore_main_heading
                            </label>
                            <input
                              type="text"
                              onBlur={formik.handleBlur}
                              name="explore_main_heading"
                              onChange={formik.handleChange}
                              value={formik.values.explore_main_heading}
                              placeholder="explore_main_heading"
                              className={`primary-input  ${formik.touched.explore_main_heading &&
                                formik.errors.explore_main_heading
                                ? 'red_border'
                                : ''
                                }`}
                            />
                          </div>


                          <div className="input_iner_container">
                            <label className="mb-3 block text-sm font-medium text-white">
                              explore_description
                            </label>
                            <input
                              type="text"

                              onBlur={formik.handleBlur}
                              name="explore_description"
                              onChange={formik.handleChange}
                              value={formik.values.explore_description}
                              placeholder="explore_description"
                              className={`primary-input  ${formik.touched.explore_description &&
                                formik.errors.explore_description
                                ? 'red_border'
                                : ''
                                }`}
                            />
                          </div>

                        </div>


                        <div className="input_iner_container w-full">
                          <label className="mb-3 block text-sm font-medium text-white">
                            right_side_Heading
                          </label>
                          <input
                            type="text"
                            name="right_side_Heading"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.right_side_Heading}
                            placeholder="right_side_Heading"
                            className={`primary-input ${formik.touched.right_side_Heading &&
                              formik.errors.right_side_Heading
                              ? 'red_border'
                              : ''
                              }`}
                          />

                        </div>

                        <div className="input_container">
                          <div className="input_iner_container">
                            <label className="mb-3 block text-sm font-medium  text-white">
                              Heading (Before products)
                            </label>
                            <input
                              onBlur={formik.handleBlur}
                              name="bottomText"
                              onChange={formik.handleChange}
                              value={formik.values.bottomText}
                              placeholder="bottomText"
                              className={`primary-input ${formik.touched.bottomText &&
                                formik.errors.bottomText
                                ? 'red_border'
                                : ''
                                }`}
                            />
                          </div>

                          <div className="input_iner_container">
                            <label className="mb-3 block text-sm font-medium  text-white">
                              Product_Section_heading
                            </label>
                            <input
                              onBlur={formik.handleBlur}
                              name="Product_Section_heading"
                              onChange={formik.handleChange}
                              value={formik.values.Product_Section_heading}
                              placeholder="bottomText"
                              className={`primary-input ${formik.touched.Product_Section_heading &&
                                formik.errors.Product_Section_heading
                                ? 'red_border'
                                : ''
                                }`}
                            />
                          </div>

                        </div>


                        <div className="">
                          <h3 className="font-medium">
                            left_side_Text
                          </h3>
                        </div>
                        <div className="flex flex-col py-4 px-2">
                          <FieldArray name="left_side_Text">
                            {({ push, remove }) => (
                              <div className="flex flex-col gap-2">
                                {formik.values.left_side_Text &&
                                  formik.values.left_side_Text.map((model: AdditionalInformation, index: number) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2"
                                    >
                                      <input
                                        type="text"
                                        name={`left_side_Text[${index}].name`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik?.values?.left_side_Text[index].name}
                                        placeholder="Heading name"
                                        className="primary-input"
                                      />
                                      <input
                                        type="text"
                                        name={`left_side_Text[${index}].detail`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.left_side_Text[index].detail}
                                        placeholder="details text"
                                        className="primary-input"
                                      />
                                      <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className=" text-red-500 "
                                      >
                                        <RxCross2
                                          className="text-red-500"
                                          size={25}
                                        />
                                      </button>
                                    </div>
                                  )
                                  )}
                                <button
                                  type="button"
                                  onClick={() => push({ name: "", detail: "" })}
                                  className="px-4 py-2 hover:bg-primary border-white border cursor-pointer rounded-md shadow-md w-fit"
                                >
                                  left_side_Text
                                </button>
                              </div>
                            )}
                          </FieldArray>
                        </div>

                      </>
                    }

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
                            className="primary-input opt"
                          >
                            <option value="" disabled className="bg-primary text-gray-500">
                              Select Category
                            </option>
                            {categoriesList?.map((category) => (
                              <option key={category.id} value={category.id} className="bg-primary option">
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
                            <h2 className="text-lg font-medium mb-3">
                              Subcategories
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <select
                                name="subcategory"
                                value={selectedSubcategory}
                                onChange={
                                  handleInnerSubCategoryChange
                                }
                                className="primary-input bg-primary"
                              >
                                <option value="" disabled className="bg-gray-500 text-black">
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


                        {(!ecomerece && Innersubcategories.length > 0) && (
                          <div className="mt-4">
                            <h2 className="text-lg font-medium mb-3">
                              child Subcategories
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              <select
                                name="Innersubcategory"
                                value={selecteInnerdSubcategory}
                                onChange={(e) => setInnerSelectedSubcategory(e.target.value)}
                                className="primary-input bg-primary"
                              >
                                <option value="" disabled className="bg-gray-500 text-black">
                                  Select child Subcategory
                                </option>
                                {Innersubcategories.map(
                                  (subCat: INNERSUBCATEGORY) => (
                                    <option key={subCat.id} value={subCat.id}>
                                      {subCat.name}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>
                        )}




                      </div>


                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-5">


                {ecomerece &&
                  <>

                    {selectedShippingOption &&
                      <div className="flex gap-4 flex-col mb-2">

                        <div className="w-full">
                          <label className="mb-1 block py-4 px-2 text-sm font-medium text-black dark:text-white">
                            Select Shipping Options (at least one)
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                            {shippingOption?.map((shipping, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-2 "
                              >


                                <Checkbox
                                  checked={!!selectedShippingOption?.find((item) => item.name === shipping.name)}
                                  className="custom-ant-checkbox"

                                  onChange={(e) => {
                                    const checked = e.target.checked;

                                    setSelectedShippingOption((prev) => {
                                      if (checked) {
                                        return [...prev, shipping];
                                      } else if (prev.length > 1) {
                                        return prev.filter((ship) => ship.name !== shipping.name);
                                      }
                                      return prev;
                                    });
                                  }}
                                  id={`shipping-${index}`}
                                />
                                <label
                                  htmlFor={`shipping-${index}`}
                                  className="ml-2 text-black dark:text-white cursor-pointer"
                                >
                                  {shipping.name}
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    }

                    {/* Additionalinformation */}
                    < div className="">
                      <h3 className="font-medium">
                        Additionalinformation
                      </h3>
                    </div>
                    <div className="flex flex-col py-4 px-2">
                      <FieldArray name="Additionalinformation">
                        {({ push, remove }) => (
                          <div className="flex flex-col gap-2">
                            {formik.values.Additionalinformation &&
                              formik.values.Additionalinformation.map((model: AdditionalInformation, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="text"
                                    name={`Additionalinformation[${index}].name`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik?.values?.Additionalinformation?.[index].name}
                                    placeholder="Heading name"
                                    className="primary-input"
                                  />
                                  <input
                                    type="text"
                                    name={`Additionalinformation[${index}].detail`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.Additionalinformation?.[index].detail}
                                    placeholder="details text"
                                    className="primary-input"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className=" text-red-500 "
                                  >
                                    <RxCross2
                                      className="text-red-500"
                                      size={25}
                                    />
                                  </button>
                                </div>
                              )
                              )}
                            <button
                              type="button"
                              onClick={() => push({ name: "", detail: "" })}
                              className="px-4 py-2 hover:bg-primary border-white border cursor-pointer rounded-md shadow-md w-fit"
                            >
                              Additionalinformation
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>


                    {/*   DescriptionBullets */}

                    <div className="">
                      <h3 className="font-medium">
                        DescriptionBullets
                      </h3>
                    </div>
                    <div className="flex flex-col py-4 px-2">
                      <FieldArray name="DescriptionBullets">
                        {({ push, remove }) => (
                          <div className="flex flex-col gap-2">
                            {formik.values.DescriptionBullets &&
                              formik.values.DescriptionBullets.map((model: AdditionalInformation, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="text"
                                    name={`DescriptionBullets[${index}].name`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik?.values?.DescriptionBullets?.[index].name}
                                    placeholder="Heading name"
                                    className="primary-input"
                                  />
                                  <input
                                    type="text"
                                    name={`DescriptionBullets[${index}].detail`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.DescriptionBullets?.[index].detail}
                                    placeholder="details text"
                                    className="primary-input"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className=" text-red-500 "
                                  >
                                    <RxCross2
                                      className="text-red-500"
                                      size={25}
                                    />
                                  </button>
                                </div>
                              )
                              )}
                            <button
                              type="button"
                              onClick={() => push({ name: "", detail: "" })}
                              className="px-4 py-2 hover:bg-primary border-white border cursor-pointer rounded-md shadow-md w-fit"
                            >
                              DescriptionBullets
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>



                    {/* Questions */}

                    <div className="">
                      <h3 className="font-medium">
                        Questions
                      </h3>
                    </div>
                    <div className="flex flex-col py-4 px-2">
                      <FieldArray name="Questions">
                        {({ push, remove }) => (
                          <div className="flex flex-col gap-2">
                            {formik.values.Questions &&
                              formik.values.Questions.map((model: AdditionalInformation, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="text"
                                    name={`Questions[${index}].name`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik?.values?.Questions?.[index].name}
                                    placeholder="Heading name"
                                    className="primary-input"
                                  />
                                  <input
                                    type="text"
                                    name={`Questions[${index}].detail`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.Questions?.[index].detail}
                                    placeholder="details text"
                                    className="primary-input"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className=" text-red-500 "
                                  >
                                    <RxCross2
                                      className="text-red-500"
                                      size={25}
                                    />
                                  </button>
                                </div>
                              )
                              )}
                            <button
                              type="button"
                              onClick={() => push({ name: "", detail: "" })}
                              className="px-4 py-2 hover:bg-primary border-white border cursor-pointer rounded-md shadow-md w-fit"
                            >
                              Questions
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>


                    {/* materialType */}

                    <div className="">
                      <h3 className="font-medium">
                        materialType
                      </h3>
                    </div>
                    <div className="flex flex-col py-4 px-2">
                      <FieldArray name="materialType">
                        {({ push, remove }) => (
                          <div className="flex flex-col gap-2">
                            {formik.values.materialType &&
                              formik.values.materialType.map((model: AdditionalInformation, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="text"
                                    name={`materialType[${index}].name`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik?.values?.materialType?.[index].name}
                                    placeholder="Heading name"
                                    className="primary-input"
                                  />
                                  <input
                                    type="text"
                                    name={`materialType[${index}].detail`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.materialType?.[index].detail}
                                    placeholder="details text"
                                    className="primary-input"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className=" text-red-500 "
                                  >
                                    <RxCross2
                                      className="text-red-500"
                                      size={25}
                                    />
                                  </button>
                                </div>
                              )
                              )}
                            <button
                              type="button"
                              onClick={() => push({ name: "", detail: "" })}
                              className="px-4 py-2 hover:bg-primary border-white border cursor-pointer rounded-md shadow-md w-fit"
                            >
                              materialType
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                    {/* Colors */}

                    <div className="">
                      <h3 className="font-medium">
                        colors
                      </h3>
                    </div>
                    <div className="flex flex-col py-4 px-2">
                      <FieldArray name="colors">
                        {({ push, remove }) => (
                          <div className="flex flex-col gap-2">
                            {formik.values.colors &&
                              formik.values.colors.map((model: AdditionalInformation, index: number) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="text"
                                    name={`colors[${index}].name`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik?.values?.colors?.[index].name}
                                    placeholder="Heading name"
                                    className="primary-input"
                                  />
                                  <input
                                    type="text"
                                    name={`colors[${index}].detail`}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.colors?.[index].detail}
                                    placeholder="details text"
                                    className="primary-input"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className=" text-red-500 "
                                  >
                                    <RxCross2
                                      className="text-red-500"
                                      size={25}
                                    />
                                  </button>
                                </div>
                              )
                              )}
                            <button
                              type="button"
                              onClick={() => push({ name: "", detail: "" })}
                              className="px-4 py-2 hover:bg-primary border-white border cursor-pointer rounded-md shadow-md w-fit"
                            >
                              colors
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>

                    {/* Variants */}

                    <div className="">
                      <h3 className="font-medium">
                        variant
                      </h3>
                    </div>
                    <div className="flex flex-col pb-4 px-2">
                      <FieldArray name="variant">
                        {({ push, remove }) => (
                          <div className="flex flex-col gap-2">
                            {formik.values.variant &&
                              formik.values.variant.map((model: AdditionalInformation, index: number) => (
                                <div key={index} className="flex items-center gap-2">
                                  <label className="flex flex-col">
                                    {index === 0 && <span className="font-bold font-zahra text-white mb-2">Name</span>}
                                    <input
                                      type="text"
                                      name={`variant[${index}].name`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik?.values?.variant?.[index].name}
                                      placeholder="Name"
                                      className="primary-input"
                                    />
                                  </label>

                                  <label className="flex flex-col max-w-[100px]">
                                    {index === 0 && <span className="font-bold font-zahra text-white mb-2">Color Code</span>}
                                    <input
                                      type="text"
                                      name={`variant[${index}].code`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik?.values?.variant?.[index].code}
                                      placeholder="Color Code"
                                      className="primary-input"
                                    />
                                  </label>

                                  <label className="flex flex-col max-w-[80px]">
                                    {index === 0 && <span className="font-bold font-zahra text-white mb-2">Price</span>}
                                    <input
                                      type="number"
                                      name={`variant[${index}].price`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={model.price || ''}
                                      placeholder="Price"
                                      className="primary-input !pe-2"
                                    />
                                  </label>

                                  <label className="flex flex-col max-w-[80px]">
                                    {index === 0 && <span className="font-bold font-zahra text-white mb-2">Disc Price</span>}
                                    <input
                                      type="number"
                                      name={`variant[${index}].discountPrice`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={model.discountPrice || ''}
                                      placeholder="Disc Price"
                                      className="primary-input !pe-2"
                                    />
                                  </label>

                                  <label className="flex flex-col max-w-[80px]">
                                    {index === 0 && <span className="font-bold font-zahra text-white mb-2">Stock</span>}
                                    <input
                                      type="number"
                                      name={`variant[${index}].stock`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={model.stock || 0}
                                      placeholder="Stock"
                                      className="primary-input !pe-2"
                                    />
                                  </label>

                                  <label className="flex flex-col">
                                    {index === 0 && <span className="font-bold font-zahra text-white mb-2">Dimension</span>}
                                    <input
                                      type="text"
                                      name={`variant[${index}].dimension`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={model.dimension}
                                      placeholder="Dimension"
                                      className="primary-input"
                                    />
                                  </label>

                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-500"
                                  >
                                    <RxCross2 className="text-red-500" size={25} />
                                  </button>
                                </div>

                              )
                              )}
                            <button
                              type="button"
                              onClick={() => push({ name: '', code: '', price: '', discountPrice: '', stock: 0 })}
                              className="px-4 py-2 hover:bg-primary border-white border cursor-pointer rounded-md shadow-md w-fit"
                            >
                              Add Variant
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>

                    {/* Sizes */}


                    <div className="">
                      <h3 className="font-medium">
                        sizes
                      </h3>
                    </div>
                    <div className="flex flex-col pb-4 px-2">
                      <FieldArray name="sizes">
                        {({ push, remove }) => (
                          <div className="flex flex-col gap-2">
                            {formik.values.sizes &&
                              formik.values.sizes.map((model: ISizes, index: number) => (
                                <div key={index} className="flex items-center gap-2">

                                  <label className="flex flex-col">
                                    {index === 0 && <span className="font-bold font-zahra text-white mb-2">Name</span>}
                                    <input
                                      type="text"
                                      name={`sizes[${index}].name`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik?.values?.sizes?.[index].name}
                                      placeholder="Name"
                                      className="primary-input"
                                    />
                                  </label>

                                  <label className="flex flex-col">
                                    {index === 0 && <span className="font-bold font-zahra text-white mb-2">Variant</span>}
                                    <select
                                      className="primary-input bg-primary"
                                      onChange={(e) => {
                                        const value = e.target.value;
                                        const updatedSizes = [...(formik.values.sizes ?? [])];

                                        if (updatedSizes[index]) {
                                          updatedSizes[index] = {
                                            ...updatedSizes[index],
                                            variantName: value,
                                          };
                                        } else {
                                          updatedSizes[index] = { variantName: value };
                                        }

                                        formik.setFieldValue("sizes", updatedSizes);
                                      }}
                                      value={formik.values.sizes?.[index].variantName}
                                    >
                                      <option value="">Select Option</option>
                                      {formik.values.variant?.map((info: AdditionalInformation, idx: number) => (
                                        <option value={info.name} key={idx}>
                                          {info.name}
                                        </option>
                                      ))}
                                    </select>
                                  </label>

                                  <label className="flex flex-col max-w-[80px]">
                                    {index === 0 && <span className="font-bold font-zahra text-white mb-2">Price</span>}
                                    <input
                                      type="number"
                                      name={`sizes[${index}].price`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik?.values?.sizes?.[index].price}
                                      placeholder="Price"
                                      className="primary-input !pe-2"
                                    />
                                  </label>

                                  <label className="flex flex-col max-w-[80px]">
                                    {index === 0 && <span className="font-bold font-zahra text-white mb-2">Disc Price</span>}
                                    <input
                                      type="number"
                                      name={`sizes[${index}].discountPrice`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik?.values?.sizes?.[index].discountPrice}
                                      placeholder="Disc Price"
                                      className="primary-input !pe-2"
                                    />
                                  </label>

                                  <label className="flex flex-col max-w-[60px]">
                                    {index === 0 && <span className="font-bold font-zahra text-white mb-2">Stock</span>}
                                    <input
                                      type="number"
                                      name={`sizes[${index}].stock`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik?.values?.sizes?.[index].stock}
                                      placeholder="Stock"
                                      className="primary-input !pe-2"
                                    />
                                  </label>

                                  <label className="flex flex-col">
                                    {index === 0 && <span className="font-bold font-zahra text-white mb-2">Dimension</span>}
                                    <input
                                      type="text"
                                      name={`sizes[${index}].dimension`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik?.values?.sizes?.[index].dimension}
                                      placeholder="Dimension"
                                      className="primary-input"
                                    />
                                  </label>

                                  <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    className="text-red-500"
                                  >
                                    <RxCross2 className="text-red-500" size={25} />
                                  </button>
                                </div>

                              )
                              )}
                            <button
                              type="button"
                              onClick={() => push({ name: '', price: '', discountPrice: '', stock: 0 })}
                              className="px-4 py-2 hover:bg-primary border-white border cursor-pointer rounded-md shadow-md w-fit"
                            >
                              Add Size
                            </button>
                          </div>
                        )}
                      </FieldArray>
                    </div>
                  </>


                }
                <div className="rounded-sm border border-stroke ">
                  <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                    <h3 className="font-medium ">
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
                                      finalToken
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
                              className="border mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none"
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
                  <div className="border-b bg-primary border-stroke py-4 px-2  ">
                    <h3 className="font-medium text-white">
                      Add Banner Image / Video
                    </h3>
                  </div>
                  {BannerImageUrl?.[0] && BannerImageUrl?.length > 0 ? (
                    <div className=" p-4 bg-primary">
                      {BannerImageUrl.map((item: ProductImage, index: number) => {
                        return (
                          <div
                            className="relative border group bg-primary rounded-lg w-fit  overflow-hidden shadow-md transform transition-transform duration-300 hover:scale-105"
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
                                    finalToken
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
                                  className="border  mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none"
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
                    <h3 className="font-medium ">
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
                                      finalToken
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
                              className="primary-input"
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
                            <input
                              className="primary-input"
                              placeholder="colorName"
                              type="text"
                              name="colorName"
                              value={item?.colorName || ""}
                              onChange={(e) =>
                                handleImageAltText(
                                  index,
                                  String(e.target.value),
                                  setImagesUrl,
                                  "colorName"
                                )
                              }
                            />
                            <input
                              className="primary-input"
                              placeholder="variant"
                              type="text"
                              name="variant"
                              value={item?.variant || ""}
                              onChange={(e) =>
                                handleImageAltText(
                                  index,
                                  String(e.target.value),
                                  setImagesUrl,
                                  "variant"
                                )
                              }
                            />
                            <input
                              className="primary-input"
                              placeholder="size"
                              type="text"
                              name="size"
                              value={item?.size || ""}
                              onChange={(e) =>
                                handleImageAltText(
                                  index,
                                  String(e.target.value),
                                  setImagesUrl,
                                  "size"
                                )
                              }
                            />
                            <input
                              className="primary-input"
                              placeholder="Material"
                              type="text"
                              name="Material"
                              value={item?.Material || ""}
                              onChange={(e) =>
                                handleImageAltText(
                                  index,
                                  String(e.target.value),
                                  setImagesUrl,
                                  "Material"
                                )
                              }
                            />
                            <input
                              className="primary-input"
                              placeholder="plankWidth"
                              type="text"
                              name="plankWidth"
                              value={item?.plankWidth || ""}
                              onChange={(e) =>
                                handleImageAltText(
                                  index,
                                  String(e.target.value),
                                  setImagesUrl,
                                  "plankWidth"
                                )
                              }
                            />
                            <input
                              className="primary-input"
                              placeholder="Location"
                              type="text"
                              name="Location"
                              value={item?.location || ""}
                              onChange={(e) =>
                                handleImageAltText(
                                  index,
                                  String(e.target.value),
                                  setImagesUrl,
                                  "Location"
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


                {!ecomerece &&
                  <>

                    <div className="rounded-sm border border-stroke ">
                      <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                        <h3 className="font-medium ">
                          left_side_image
                        </h3>
                      </div>

                      {left_side_image && left_side_image.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                          {left_side_image.map((item: ProductImage, index) => {
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
                                          setleft_side_image,
                                          finalToken
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
                                  className="border mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none"
                                  placeholder="altText"
                                  type="text"
                                  name="altText"
                                  value={item?.altText || ""}
                                  onChange={(e) =>
                                    handleImageAltText(
                                      index,
                                      String(e.target.value),
                                      setleft_side_image,
                                      "altText"
                                    )
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <ImageUploader setImagesUrl={setleft_side_image} />
                      )}
                    </div>

                    <div className="rounded-sm border border-stroke ">
                      <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                        <h3 className="font-medium ">
                          categoryHeroImages
                        </h3>
                      </div>
                      <ImageUploader setImagesUrl={setfeatureImagesImagesUrl} multiple />


                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                        {featureImagesimagesUrl?.map(
                          (item: ProductImage, index) => {



                            return (
                              <div
                                key={index}
                                draggable
                                onDragStart={() => (dragFeatureImage.current = index)}
                                onDragEnter={() =>
                                  (draggedOverfeatureImage.current = index)
                                }
                                onDragEnd={handleFeatreSort}
                                onDragOver={(e) => e.preventDefault()}
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
                                          setfeatureImagesImagesUrl,
                                          finalToken
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
                                  className="border mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none"
                                  placeholder="altText"
                                  type="text"
                                  name="altText"
                                  value={item?.altText || ""}
                                  onChange={(e) =>
                                    handleImageAltText(
                                      index,
                                      String(e.target.value),
                                      setfeatureImagesImagesUrl,
                                      "altText"
                                    )
                                  }
                                />

                                {ecomerece && (
                                  <>
                                    <input
                                      className="border mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none"
                                      placeholder="color"
                                      type="text"
                                      name="color"
                                      value={item?.color || ""}
                                      onChange={(e) =>
                                        handleImageAltText(
                                          index,
                                          String(e.target.value),
                                          setfeatureImagesImagesUrl,
                                          "color"
                                        )
                                      }
                                    />
                                    <input
                                      className="border mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none"
                                      placeholder="colorName"
                                      type="text"
                                      name="colorName"
                                      value={item?.colorName}
                                      onChange={(e) =>
                                        handleImageAltText(
                                          index,
                                          String(e.target.value),
                                          setfeatureImagesImagesUrl,
                                          "colorName"
                                        )
                                      }
                                    />
                                  </>
                                )}
                              </div>
                            );
                          }
                        )}
                      </div>


                    </div>
                  </>
                }

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
                  <label className="font-semibold">Product Status:</label>

                  {['DRAFT', 'PUBLISHED'].map((status) => {
                    const isActive = field.value === status;

                    return (
                      <button
                        key={status}
                        type="button"
                        onClick={() => form.setFieldValue('status', status)}
                        disabled={isActive}
                        className={`px-4 py-2 rounded-md text-sm border
                          ${isActive
                            ? 'bg-black text-white border-black cursor-not-allowed'
                            : 'bg-white text-black border-gray-300 hover:bg-gray-100 cursor-pointer'
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
