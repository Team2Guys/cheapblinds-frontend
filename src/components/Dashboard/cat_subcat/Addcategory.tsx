'use client';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import { handleImageAltText, handleSort, ImageRemoveHandler } from 'utils/helperFunctions';
import Toaster from 'components/Toaster/Toaster';
import { Formik, Form, FormikHelpers, ErrorMessage, Field, FieldArray } from 'formik';
import { IoMdArrowRoundBack } from 'react-icons/io';
import ImageUploader from 'components/ImageUploader/ImageUploader';
import { AdditionalInformation, ProductImage } from 'types/prod';
import { Category, EDIT_CATEGORY } from 'types/cat';
import { CREATE_CATEGORY, UPDATE_CATEGORY } from 'graphql/mutations';
import { FETCH_ALL_CATEGORIES } from 'graphql/queries';
import ReactCrop, { Crop } from 'react-image-crop';
import { Modal } from 'antd';
import { centerAspectCrop } from 'types/product-crop';
import TinyMCEEditor from 'components/Dashboard/tinyMc/MyEditor';
import revalidateTag from 'components/ServerActons/ServerAction';
import { categoryValidationSchema } from 'data/Validations';
import { categoryInitialValues } from 'data/InitialValues';
import { uploadPhotosToBackend } from 'utils/fileUploadhandlers';
import { useSession } from 'next-auth/react';
import ApoloClient from 'utils/AppoloClient';

interface editCategoryProps {
  seteditCategory: React.Dispatch<SetStateAction<Category | undefined | null>>;
  editCategory: Category | undefined | null;
  setMenuType: React.Dispatch<SetStateAction<string>>;

}



const AddCategory = ({
  seteditCategory,
  editCategory,
  setMenuType,
}: editCategoryProps) => {
  const CategoryName: EDIT_CATEGORY | null = editCategory && editCategory.name
    ? {
      name: editCategory.name || "",
      description: editCategory.description || '',
      Meta_Title: editCategory.Meta_Title || '',
      short_description: editCategory.short_description || '',
      Meta_Description: editCategory.Meta_Description || '',
      seoSchema: editCategory.seoSchema || '',
      Canonical_Tag: editCategory.Canonical_Tag || '',
      custom_url: editCategory.custom_url || "",
      topHeading: editCategory.topHeading || "",
      RecallUrl: editCategory.RecallUrl || "",
      categoryHeroText: Array.isArray(editCategory.categoryHeroText)
        ? editCategory.categoryHeroText
        : [],
      categoryFaqs: editCategory.categoryFaqs || [],
      categoryText: Array.isArray(editCategory.categoryText)
        ? editCategory.categoryText
        : [],
      paras: editCategory.paras || [],
      categoryHeroToptext: editCategory.categoryHeroToptext || "",
      categoryHeroHeading: editCategory.categoryHeroHeading || "",
      leftHeading: editCategory.leftHeading || "",
      Heading: editCategory.Heading || "",

      bodyHeading: editCategory.bodyHeading || "",
      bodyMainHeading: editCategory.bodyMainHeading || "",
      bodyText: editCategory.bodyText || "",
      Bannerdiscount: editCategory.Bannerdiscount || "",
      salesBannerHeading: editCategory.salesBannerHeading || "",
      paraText: editCategory.paraText || "",
      Bannercounter: editCategory.Bannercounter ? new Date(`${editCategory.Bannercounter}`).toISOString().split('T')[0] : "",
      BannerText: editCategory.BannerText || "",
      BannerHeading: editCategory.BannerHeading || "",
      breadCrum: editCategory.breadCrum || "",
      topDescription: editCategory.topDescription || "",


      // on Procuts Main Heading
      bottomText: editCategory.bottomText || "",
      Product_Section_heading: editCategory.Product_Section_heading || "",
      // explor flooring Options
      explore_Heading: editCategory.explore_Heading || "",
      explore_main_heading: editCategory.explore_main_heading || "",
      explore_description: editCategory.explore_description || "",
      status: editCategory?.status || 'DRAFT',
    }
    : null;


  const session = useSession()
  const finalToken = session.data?.accessToken
  const [posterimageUrl, setposterimageUrl] = useState<ProductImage[] | undefined>((editCategory && editCategory.posterImageUrl) ? [editCategory.posterImageUrl] : undefined);
  const [BannerImageUrl, setBannerImageUrl] = useState<ProductImage[] | undefined>(editCategory && editCategory?.Banners ? [editCategory?.Banners] : undefined);
  const [imagesUrl, setImagesUrl] = useState<ProductImage[] | undefined>(editCategory ? editCategory?.categoryHeroImages : []);
  const [salesBannerImageUrl, setsalesBannerImageUrl] = useState<ProductImage[] | undefined>(editCategory && editCategory?.salesBannerImage ? editCategory?.salesBannerImage : undefined)
  const [loading, setloading] = useState<boolean>(false);
  const [editCategoryName, setEditCategoryName] = useState<EDIT_CATEGORY | null | undefined>(CategoryName);
  const [isCropModalVisible, setIsCropModalVisible] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const dragImage = useRef<number | null>(null);
  const draggedOverImage = useRef<number | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const onSubmit = async (values: EDIT_CATEGORY, { resetForm }: FormikHelpers<EDIT_CATEGORY>) => {
    try {

      const posterImageUrl = posterimageUrl && posterimageUrl[0];
      const Banner = BannerImageUrl && BannerImageUrl[0];
      const salesBannerImages = salesBannerImageUrl && salesBannerImageUrl[0];
      const categoryHeroImages = (imagesUrl && imagesUrl.length > 0) ? imagesUrl : [];
      if (!posterImageUrl) return Toaster('error', 'Please select relevant Images');
      const newValue = { ...values, posterImageUrl, Banners: Banner, categoryHeroImages, salesBannerImage: salesBannerImages, Bannercounter: values.Bannercounter === '' ? null : values.Bannercounter };

      const updateFlag = editCategoryName ? true : false;
      setloading(true);
      if (updateFlag) {
        await ApoloClient.mutate({
          mutation: UPDATE_CATEGORY,
          context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
            credentials: 'include',
          },
          variables: { input: { id: Number(editCategory?.id), ...newValue } },
          refetchQueries: [{ query: FETCH_ALL_CATEGORIES }],
        });
      } else {
        await ApoloClient.mutate({
          mutation: CREATE_CATEGORY,
          variables: { input: newValue },
          refetchQueries: [{ query: FETCH_ALL_CATEGORIES }],
          context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
            credentials: 'include',
          },

        });
      }

      revalidateTag('categories');

      Toaster(
        'success',
        updateFlag ? 'Category has been successfully updated!' : 'Category has been successfully created!',
      );

      seteditCategory?.(undefined);
      setposterimageUrl(undefined);
      setMenuType('Categories');
      resetForm();
    } catch (err) {//eslint-disable-nextline
      //@ts-expect-error("Expected error")
      Toaster('error', err?.message || "Internal Server Error")
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    setEditCategoryName(CategoryName)

  }, [editCategory])


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
    const ctx = canvas?.getContext('2d');

    canvas.width = crop?.width;
    canvas.height = crop?.height;

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

    const base64Image = canvas?.toDataURL('image/jpeg');
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
          setBannerImageUrl((prevImages) =>
            prevImages?.map((img) =>
              img.imageUrl === imageSrc ? { ...img, ...newImage } : img
            )
          );
          setsalesBannerImageUrl((prevImages) =>
            prevImages?.map((img) =>
              img.imageUrl === imageSrc ? { ...img, ...newImage } : img
            )
          );
        }, 0);
      } catch (error) {
        Toaster('error', 'Failed to upload cropped image');
        return error
      }
    }
  };

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
    <>
      <p
        className="dashboard_primary_button w-fit"
        onClick={() => {
          setMenuType('Categories');
        }}
      >
        <IoMdArrowRoundBack /> Back
      </p>

      <Formik
        initialValues={
          editCategoryName ? editCategoryName : categoryInitialValues
        }
        validationSchema={categoryValidationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form onSubmit={formik.handleSubmit}>
              <div className="flex justify-center  bg-primary ">
                <div className="flex flex-col gap-5 bg-primary md:gap-9 w-full lg:w-4/5 xl:w-3/5  ">
                  <div className="rounded-sm border border-stroke bg-primary  p-3">
                    <div className="rounded-sm border bg-primary border-stroke">
                      <div className="border-b bg-primary border-stroke py-4 px-2 hover:bg-black">
                        <h3 className="font-medium  text-white">
                          Add Category Images
                        </h3>
                      </div>
                      {posterimageUrl && posterimageUrl.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4  dark:border-white dark:bg-black">
                          {posterimageUrl.map((item: ProductImage, index: number) => {

                            return (
                              <div
                                className="relative group rounded-lg overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105"
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
                                        finalToken
                                      );
                                    }}
                                  />
                                </div>

                                <Image
                                  onClick={() => handleCropClick(item.imageUrl)}
                                  key={index}
                                  className="object-cover w-full h-full dark:bg-black dark:shadow-lg cursor-crosshair"
                                  width={300}
                                  height={200}
                                  src={item.imageUrl}
                                  loading='lazy'
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
                                      setposterimageUrl,
                                      "altText"
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
                    <div className="rounded-sm border border-stroke dark:border-strokedark ">
                      <div className="border-b bg-primary border-stroke py-4 px-2  ">
                        <h3 className="font-medium text-white">
                          Add Discount banner Image
                        </h3>
                      </div>
                      {salesBannerImageUrl?.[0] && salesBannerImageUrl?.length > 0 ? (
                        <div className=" p-4 bg-primary">
                          {salesBannerImageUrl.map((item: ProductImage, index: number) => {
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
                                        setsalesBannerImageUrl,
                                        finalToken
                                      );
                                    }}
                                  />
                                </div>

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
                                      setsalesBannerImageUrl,
                                      "altText"
                                    )
                                  }
                                />
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <ImageUploader setImagesUrl={setsalesBannerImageUrl} />
                      )}
                    </div>
                    <div className="rounded-sm border border-stroke bg-white  dark:bg-black">
                      <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                        <h3 className="font-medium  dark:text-white">
                          Categories Images
                        </h3>
                      </div>

                      <ImageUploader setImagesUrl={setImagesUrl} />

                      {imagesUrl && imagesUrl.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                          {imagesUrl.map((item: ProductImage, index) => {
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
                                  className="border mt-2 w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none"
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
                          })}
                        </div>
                      ) : null}
                    </div>

                    <div className="flex flex-col">
                      <div>
                        <label className="mb-3 block py-4 px-2 text-sm font-medium  text-white">
                          Category Title
                        </label>
                        <Field
                          type="text"
                          name="name"
                          placeholder="Title"
                          className={`primary-input ${formik.touched.name && formik.errors.name ? "red_border" : ""
                            }`}
                        />
                        <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                      </div>


                      <div className='flex gap-0 sm:gap-10 flex-wrap sm:flex-nowrap'>
                        <div className='w-full'>
                          <label className=" block py-4 px-2 text-sm font-medium text-white">
                            Custom URL
                          </label>
                          <Field
                            type="text"
                            name="custom_url"
                            placeholder="Custom URL"
                            className={`primary-input ${formik.touched.custom_url && formik.errors.custom_url ? "red_border" : ""}`}
                          />
                          <ErrorMessage name="custom_url" component="div" className="text-red-500 text-sm" />

                        </div>

                        <div className='w-full '>
                          <label className="block py-4 px-2 text-sm font-medium text-white">

                            Bread Crum
                          </label>
                          <Field
                            type="text"
                            name="breadCrum"
                            placeholder="breadCrum"
                            className={`primary-input ${formik.touched.breadCrum && formik.errors.breadCrum ? "red_border" : ""
                              }`}
                          />
                          <ErrorMessage name="breadCrum" component="div" className="text-red-500 text-sm" />
                        </div>


                      </div>


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
                      <div>
                        <label className=" block py-4 px-2 text-sm font-medium text-white">
                          Category Description
                        </label>
                        <TinyMCEEditor name="description" />
                        <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                      </div>

                      {/* FLORRING TOP HEADING AND DESCRIPTION AFTER HERO */}
                      <div className="input_container">
                        <div className="input_iner_container">
                          <label className="mb-3 block text-sm font-medium  text-white">
                            topHeading (flooring)
                          </label>
                          <input
                            type='text'
                            name="topHeading"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.topHeading}
                            placeholder="topHeading"
                            className={`primary-input ${formik.touched.topHeading &&
                              formik.errors.topHeading
                              ? 'red_border'
                              : ''
                              }`}
                          />
                        </div>
                        <div className="input_iner_container">
                          <label className="mb-2 block text-sm font-medium text-white">
                            topDescription (flooring)
                          </label>
                          <input
                            type='text'

                            name="topDescription"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.topDescription}
                            placeholder="topDescription"
                            className={`primary-input ${formik.touched.topDescription &&
                              formik.errors.topDescription
                              ? 'red_border'
                              : ''
                              }`}
                          />

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
                                        value={formik?.values?.categoryHeroText?.[index].name}
                                        placeholder="Heading name"
                                        className="primary-input"
                                      />
                                      <input
                                        type="text"
                                        name={`categoryHeroText[${index}].detail`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.categoryHeroText?.[index].detail}
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
                                          value={formik?.values?.categoryFaqs?.[index].name}
                                          placeholder="Heading name"
                                          className="primary-input"
                                        />
                                        <input
                                          type="text"
                                          name={`categoryFaqs[${index}].detail`}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.categoryFaqs?.[index].detail}
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


                      {/* WALL DECOR BENEFIRTS/FLOORING DESCRIPTION */}
                      <div className="mt-3">
                        <div className="input_iner_container w-full">
                          <label className="mb-3 block text-sm font-medium  text-white">
                            leftHeading(Wall decor/flooring)
                          </label>
                          <input
                            type='text'
                            name="leftHeading"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.leftHeading}
                            placeholder="leftHeading"
                            className={`primary-input ${formik.touched.leftHeading &&
                              formik.errors.leftHeading
                              ? 'red_border'
                              : ''
                              }`}
                          />

                        </div>




                        <div className="rounded-sm border border-stroke bg-primary mt-5">
                          <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
                            <h3 className="font-medium  dark:text-white">
                              Benefits (Wall Decor) or Description (flooring)
                            </h3>
                          </div>
                          <div className="flex flex-col py-4 px-2">
                            <FieldArray name="categoryText">
                              {({ push, remove }) => (
                                <div className="flex flex-col gap-2">
                                  {formik.values.categoryText &&
                                    formik.values.categoryText.map((model: AdditionalInformation, index: number) => (
                                      <div
                                        key={index}
                                        className="flex items-center gap-2"
                                      >
                                        <input
                                          type="text"
                                          name={`categoryText[${index}].name`}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik?.values?.categoryText?.[index].name}
                                          placeholder="Heading name"
                                          className="primary-input"
                                        />
                                        <input
                                          type="text"
                                          name={`categoryText[${index}].detail`}
                                          onChange={formik.handleChange}
                                          onBlur={formik.handleBlur}
                                          value={formik.values.categoryText?.[index].detail}
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
                                    Benefits of Hiring TwoGuys(Wall Decore)
                                  </button>
                                </div>
                              )}
                            </FieldArray>
                          </div>
                        </div>

                      </div>

                      <div className="rounded-sm border border-stroke bg-primary mt-5 ">
                        <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
                          <h3 className="font-medium  dark:text-white">
                            Category instalation
                          </h3>
                        </div>

                        <div className="input_container pl-5 pr-5 ">

                          <div className="input_iner_container">
                            <label className="mb-3 block text-sm font-medium  text-white">
                              bodyHeading
                            </label>
                            <textarea

                              name="bodyHeading"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.bodyHeading}
                              placeholder="bodyHeading"
                              className={`primary-input ${formik.touched.bodyHeading &&
                                formik.errors.bodyHeading
                                ? 'red_border'
                                : ''
                                }`}
                            />

                          </div>

                          <div className="input_iner_container">
                            <label className="mb-3 block text-sm font-medium text-white">
                              bodyMainHeading
                            </label>
                            <textarea

                              name="bodyMainHeading"
                              onChange={formik.handleChange}
                              onBlur={formik.handleBlur}
                              value={formik.values.bodyMainHeading}
                              placeholder="bodyMainHeading"
                              className={`primary-input ${formik.touched.bodyMainHeading &&
                                formik.errors.bodyMainHeading
                                ? 'red_border'
                                : ''
                                }`}
                            />

                          </div>


                        </div>


                        <div className="input_iner_container w-full pl-5 pr-5">
                          <label className="mb-3 block text-sm font-medium text-white">
                            bodyText
                          </label>
                          <textarea
                            onBlur={formik.handleBlur}
                            name="bodyText"
                            onChange={formik.handleChange}
                            value={formik.values.bodyText}
                            placeholder="bodyText"
                            className={`primary-input ${formik.touched.bodyText &&
                              formik.errors.bodyText
                              ? 'red_border'
                              : ''
                              }`}
                          />
                        </div>

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



                      <div className="rounded-sm border border-stroke bg-primary mt-5">
                        <div className="">
                          <label className="mb-3 block text-sm font-medium text-white">
                            customised Flooring Heading
                          </label>
                          <textarea
                            onBlur={formik.handleBlur}
                            name="Heading"
                            onChange={formik.handleChange}
                            value={formik.values.Heading}
                            placeholder="Heading"
                            className={`primary-input ${formik.touched.Heading &&
                              formik.errors.Heading
                              ? 'red_border'
                              : ''
                              }`}
                          />
                        </div>

                        <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
                          <h3 className="font-medium  dark:text-white">
                            customised Flooring Heading ( Description)
                          </h3>
                        </div>
                        <div className="flex flex-col py-4 px-2">
                          <FieldArray name="paras">
                            {({ push, remove }) => (
                              <div className="flex flex-col gap-2">
                                {formik.values.paras &&
                                  formik.values.paras.map((model: AdditionalInformation, index: number) => (
                                    <div
                                      key={index}
                                      className="flex items-center gap-2"
                                    >
                                      <input
                                        type="text"
                                        name={`paras[${index}].name`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik?.values?.paras?.[index].name}
                                        placeholder="Heading name"
                                        className="primary-input"
                                      />
                                      <input
                                        type="text"
                                        name={`paras[${index}].detail`}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.paras?.[index].detail}
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
                                  Add Heading/Description
                                </button>
                              </div>
                            )}
                          </FieldArray>
                        </div>





                      </div>

                      {/* After instalation Section */}

                      <div className="input_container">
                        <div className="input_iner_container">
                          <label className="mb-3 block text-sm font-medium text-white">
                            explore_Heading(After instalation Section)
                          </label>
                          <textarea
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
                          <textarea
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
                          <textarea
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




                      {/* Banners heading for E Comerece */}
                      <div className="input_container">
                        <div className="input_iner_container">
                          <label className="mb-3 block text-sm font-medium text-white">
                            Bannerdiscount
                          </label>
                          <textarea
                            name="Bannerdiscount"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.Bannerdiscount}
                            placeholder="Bannerdiscount"
                            className={`primary-input ${formik.touched.Bannerdiscount &&
                              formik.errors.Bannerdiscount
                              ? 'red_border'
                              : ''
                              }`}
                          />

                        </div>

                        <div className="input_iner_container">
                          <label className="mb-3 block text-sm font-medium text-white">
                            salesBannerHeading
                          </label>
                          <textarea
                            onBlur={formik.handleBlur}
                            name="salesBannerHeading"
                            onChange={formik.handleChange}
                            value={formik.values.salesBannerHeading}
                            placeholder="salesBannerHeading"
                            className={`primary-input  ${formik.touched.salesBannerHeading &&
                              formik.errors.salesBannerHeading
                              ? 'red_border'
                              : ''
                              }`}
                          />
                        </div>


                      </div>


                      <div className="input_container">
                        <div className="input_iner_container">
                          <label className="mb-2 block text-sm font-medium text-white">
                            Sales Banner Paragraph
                          </label>
                          <input
                            type='text'
                            name="paraText"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.paraText}
                            placeholder="paraText"
                            className={`primary-input ${formik.touched.paraText &&
                              formik.errors.paraText
                              ? 'red_border'
                              : ''
                              }`}
                          />
                        </div>
                        <div className="input_iner_container">
                          <label className="mb-2 block text-sm font-medium text-white">
                            Sales Banner Timer
                          </label>
                          <input
                            type='date'
                            name="Bannercounter"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.Bannercounter}
                            placeholder="paraText"
                            min={new Date().toISOString().split('T')[0]}
                            className={`primary-input ${formik.touched.Bannercounter &&
                              formik.errors.Bannercounter
                              ? 'red_border'
                              : ''
                              }`}
                          />

                        </div>
                      </div>


                      <div className="input_container">
                        <div className="input_iner_container">
                          <label className="mb-3 block text-sm font-medium text-white">
                            Meta Title
                          </label>
                          <input
                            type="text"
                            name="Meta_Title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.Meta_Title}
                            placeholder="Meta Title"
                            className={`primary-input ${formik.touched.Meta_Title &&
                              formik.errors.Meta_Title
                              ? 'red_border'
                              : ''
                              }`}
                          />
                          {formik.touched.Meta_Title &&
                            formik.errors.Meta_Title ? (
                            <div className="text-red text-sm">
                              {formik.errors.Meta_Title as string}
                            </div>
                          ) : null}
                        </div>


                        <div className="input_iner_container">
                          <label className="mb-3 block text-sm font-medium text-white">
                            Canonical Tag
                          </label>
                          <Field
                            type='text'
                            name="Canonical_Tag"

                            placeholder="Canonical Tag"
                            className={`primary-input ${formik.touched.Canonical_Tag &&
                              formik.errors.Canonical_Tag
                              ? 'red_border'
                              : ''
                              }`}
                          />


                        </div>


                      </div>





                      <div className="mt-4">
                        <label className="mb-3 block text-sm font-medium  text-white">
                          Meta Description
                        </label>
                        <Field
                          as="textarea"
                          name="Meta_Description"
                          placeholder="Meta Description"
                          className={`primary-input ${formik.touched.Meta_Description && formik.errors.Meta_Description
                            ? "red_border"
                            : ""
                            }`}
                        />
                        <ErrorMessage name="Meta_Description" component="div" className="text-red text-sm" />
                      </div>
                      <div className="mt-4">
                        <label className="mb-3 block text-sm font-medium  text-white">
                          Seo Schema
                        </label>
                        <Field
                          as="textarea"
                          name="seoSchema"
                          placeholder="Seo Schema"
                          className={`primary-input ${formik.touched.seoSchema && formik.errors.seoSchema
                            ? "red_border"
                            : ""
                            }`}
                        />
                        <ErrorMessage name="seoSchema" component="div" className="text-red text-sm" />
                      </div>

                    </div>

                    <Field name="status">
                      {({ field, form }: import('formik').FieldProps) => (
                        <div className="flex gap-4 items-center my-4">
                          <label className="font-semibold">Category Status:</label>

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
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="dashboard_primary_button "
                  disabled={loading}
                >
                  {loading ? "loading..." : 'Submit'}
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export default AddCategory
