'use client';
import React, { useEffect, useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import { handleImageAltText, handleSort, ImageRemoveHandler } from 'utils/helperFunctions';
import { Formik, Form, FormikHelpers, Field, ErrorMessage, FieldArray, } from 'formik';
import { IoMdArrowRoundBack } from 'react-icons/io';
import showToast from 'components/Toaster/Toaster';
import { DASHBOARD_ADD_SUBCATEGORIES_PROPS } from 'types/PagesProps';
import { AdditionalInformation, ProductImage } from 'types/prod';
import { ISUBCATEGORY_EDIT } from 'types/cat';
import ImageUploader from 'components/ImageUploader/ImageUploader';
import { useMutation } from '@apollo/client';
import { CREATE_SUBCATEGORY, UPDATE_SUBCATEGORY } from 'graphql/mutations';
import { FETCH_ALL_SUB_CATEGORIES } from 'graphql/queries';
import revalidateTag from 'components/ServerActons/ServerAction';
import ReactCrop, { Crop } from 'react-image-crop';
import { Modal } from 'antd';
import { centerAspectCrop } from 'types/product-crop';
import TinyMCEEditor from 'components/Dashboard/tinyMc/MyEditor';
import { subcategoryInitialValues } from 'data/InitialValues';
import { subcategoryValidationSchema } from 'data/Validations';
import { uploadPhotosToBackend } from 'utils/fileUploadhandlers';
import { useSession } from 'next-auth/react';

const AddSubcategory = ({
  seteditCategory,
  editCategory,
  setMenuType,
  categoriesList,
}: DASHBOARD_ADD_SUBCATEGORIES_PROPS) => {

  const CategoryName: ISUBCATEGORY_EDIT | undefined = editCategory && editCategory.name
    ? {
      name: editCategory.name,
      description: editCategory.description || '',

      custom_url: editCategory.custom_url || "",

      Meta_Title: editCategory.Meta_Title || '',
      short_description: editCategory.short_description || '',
      Meta_Description: editCategory.Meta_Description || '',
      Canonical_Tag: editCategory.Canonical_Tag || '',

      // Optional: adjust this if it's meant to be categoryHeroHeading
      categoryHeroHeading: editCategory?.categoryHeroHeading || '',

      categoryHeroText: editCategory?.categoryHeroText || [],
      categoryFaqs: editCategory?.categoryFaqs || [],
      categoryHeroImages: editCategory?.categoryHeroImages || [],

      // Add missing fields
      categoryText: editCategory?.categoryText || [],

      category: editCategory?.Category?.id || 4,
      BannerHeading: editCategory?.BannerHeading || "",
      BannerText: editCategory?.BannerText || "",
      leftHeading: editCategory?.leftHeading || "",
      categoryHeroToptext: editCategory?.categoryHeroToptext || "",
      CustomHeading: editCategory?.CustomHeading || [],
      CustomText: editCategory?.CustomText || [],


      QualityHeadings: editCategory?.QualityHeadings || [],
      QualityText: editCategory?.QualityText || [],


      collectionHeading: editCategory?.collectionHeading || "",
      collectionMainHeading: editCategory?.collectionMainHeading || "",


      Product_Section_heading: editCategory?.Product_Section_heading || "",
      bottomText: editCategory?.bottomText || "",
      bodyHeading: editCategory?.bodyHeading || "",
      bodyText: editCategory?.bodyText || "",
      bodyMainHeading: editCategory?.bodyMainHeading || "",

      explore_Heading: editCategory?.explore_Heading || "",
      explore_main_heading: editCategory?.explore_main_heading || "",
      explore_description: editCategory?.explore_description || "",
      status: editCategory?.status || 'DRAFT',

    }
    : undefined;

  const [posterimageUrl, setposterimageUrl] = useState<ProductImage[] | undefined>((editCategory && editCategory?.posterImageUrl) ? [editCategory?.posterImageUrl] : undefined);
  const [professionalServiceImageurl, setprofessionalServiceImageurl] = useState<ProductImage[] | undefined>((editCategory && editCategory?.ProfessionalServiceImage) ? [editCategory?.ProfessionalServiceImage] : undefined);
  const [BannerImageUrl, setBannerImageUrl] = useState<ProductImage[] | undefined>(editCategory && editCategory?.Banners ? [editCategory?.Banners] : undefined);
  const [imagesUrl, setImagesUrl] = useState<ProductImage[] | undefined>(editCategory ? editCategory?.categoryHeroImages : []);
  const [QualityImages, seQualityImages] = useState<ProductImage[] | undefined>(editCategory ? editCategory?.QualityImages : []);


  const [isCropModalVisible, setIsCropModalVisible] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [loading, setloading] = useState<boolean>(false);

  const [editCategoryName, setEditCategoryName] = useState<ISUBCATEGORY_EDIT | undefined>(CategoryName);
  const session = useSession()
  const finalToken = session.data?.accessToken

  const [createSubCategory] = useMutation(CREATE_SUBCATEGORY);
  const [updateSubCategory] = useMutation(UPDATE_SUBCATEGORY);
  const dragImage = useRef<number | null>(null);
  const draggedOverImage = useRef<number | null>(null);

  const onSubmit = async (values: ISUBCATEGORY_EDIT, { resetForm }: FormikHelpers<ISUBCATEGORY_EDIT>) => {
    if (!values.category) {
      return showToast('warn', 'Select parent category!!');
    } try {


      setloading(true);
      const posterImageUrl = posterimageUrl && posterimageUrl[0];
      const newprofessionalServiceImageurl = professionalServiceImageurl && professionalServiceImageurl[0];
      const Banner = BannerImageUrl && BannerImageUrl[0];
      const categoryHeroImages = (imagesUrl && imagesUrl.length > 0) ? imagesUrl : [];
      const newValue = { ...values, professionalServiceImage: newprofessionalServiceImageurl, posterImageUrl: posterImageUrl, Banners: Banner, categoryHeroImages, QualityImages };

      const updateFlag = editCategoryName ? true : false;

      if (updateFlag) {
        // Update Existing SubCategory
        await updateSubCategory({
          variables: {
            input: {
              id: Number(editCategory?.id),
              ...newValue,
            },
          },
          refetchQueries: [{ query: FETCH_ALL_SUB_CATEGORIES }],
          context: {
            headers: {
              authorization: `Bearer ${finalToken}`,

            },
          },
        })
        showToast('success', 'Sub Category has been successfully updated!');
      } else {
        // Create New SubCategory
        await createSubCategory({
          variables: {
            input: newValue,
          },
          refetchQueries: [{ query: FETCH_ALL_SUB_CATEGORIES }],
          context: {
            headers: {
              authorization: `Bearer ${finalToken}`,

            },
          },
        });
        showToast('success', 'Sub Category has been successfully created!');
      }

      revalidateTag('subcategories');

      setloading(false);
      seteditCategory?.(undefined);
      setposterimageUrl(undefined);
      setBannerImageUrl(undefined)
      resetForm();
      setMenuType('Sub Categories');
    } catch (err) {
      setloading(false);

      showToast('error', 'Something went wrong!');
      throw err
    }
  }

  useEffect(() => {
    setposterimageUrl((editCategory && editCategory?.posterImageUrl) ? [editCategory?.posterImageUrl] : undefined);
    setprofessionalServiceImageurl((editCategory && editCategory?.ProfessionalServiceImage) ? [editCategory?.ProfessionalServiceImage] : undefined);
    setBannerImageUrl(editCategory && editCategory?.Banners ? [editCategory?.Banners] : undefined)


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
        if (!response) return;

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
        }, 0);
      } catch (error) {
        showToast('error', 'Failed to upload cropped image');
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


    // <Formik
    //   initialValues={
    //     editCategoryName ? editCategoryName : subcategoryInitialValues
    //   }
    //   validationSchema={subcategoryValidationSchema}
    //   onSubmit={onSubmit}
    // >
    <Formik
      initialValues={editCategoryName ? editCategoryName : subcategoryInitialValues}
      enableReinitialize
      validationSchema={subcategoryValidationSchema}
      onSubmit={onSubmit}

    >
      {(formik) => {
        return (
          <Form onSubmit={formik.handleSubmit}>
            <div className='flex flex-wrap mb-5 gap-2 justify-between items-center'>
              <p
                className="dashboard_primary_button"
                onClick={() => {
                  setMenuType('Sub Categories');
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
            <div className="flex justify-center dark:bg-boxdark bg-primary">
              <div className="flex flex-col gap-5 md:gap-9 w-full lg:w-4/5 xl:w-2/5 bg-primary">
                <div className="rounded-sm border border-stroke bg-primary p-3">


                  <div className="rounded-sm border border-stroke bg-white">
                    <div className="border-b border-stroke py-4 px-2 bg-primary">
                      <h3 className="font-medium  ">
                        Add Sub Category Poster Image

                      </h3>
                    </div>
                    {posterimageUrl?.[0] && posterimageUrl.length > 0 ? (
                      <div className="p-4 bg-primary">
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


                  <div className="rounded-sm border border-stroke bg-white">
                    <div className="border-b border-stroke py-4 px-2 bg-primary">
                      <h3 className="font-medium  ">
                        Add Sub Category professional service Image

                      </h3>
                    </div>
                    {professionalServiceImageurl?.[0] && professionalServiceImageurl.length > 0 ? (
                      <div className="p-4 bg-primary">
                        {professionalServiceImageurl.map((item: ProductImage, index: number) => {
                          return (
                            <div
                              className="relative group rounded-lg w-fit  overflow-hidden shadow-md bg-white transform transition-transform duration-300 hover:scale-105"
                              key={index}
                            >
                              <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full ">
                                <RxCross2
                                  className="cursor-pointer border rounded text-red-500 dark:text-red-700"
                                  size={17}
                                  onClick={() => {
                                    ImageRemoveHandler(
                                      item.public_id,
                                      setprofessionalServiceImageurl,
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
                                    setprofessionalServiceImageurl,
                                    "altText"
                                  )
                                }
                              />
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <ImageUploader setImagesUrl={setprofessionalServiceImageurl} />
                    )}
                  </div>

                  <div className="rounded-sm border border-stroke dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b bg-primary border-stroke py-4 px-2 dark:bg-boxdark dark:bg-black text-white dark:bg-boxdark dark:border-white">
                      <h3 className="font-medium text-white">
                        Add Banner Image
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
                                  // src={item?.imageUrl || ""}
                                  height={200} width={200}
                                  className="w-full h-full max-h-[300px] max-w-full dark:bg-black dark:shadow-lg"
                                  autoPlay
                                  muted
                                  controls

                                >
                                  <source src={item?.imageUrl || ""} />

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


                  <div className="rounded-sm border border-stroke">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium  ">
                        Categories Images(After hero Section)
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
                                  fill
                                  key={index}
                                  className="object-cover w-full h-full md:h-32 dark:bg-black dark:shadow-lg cursor-crosshair"
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

                  <div className="rounded-sm border border-stroke">
                    <div className="border-b border-stroke py-4 px-4 dark:border-strokedark">
                      <h3 className="font-medium  ">
                        Images Quality Section
                      </h3>
                    </div>

                    <ImageUploader setImagesUrl={seQualityImages} multiple />

                    {QualityImages && QualityImages.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                        {QualityImages.map((item: ProductImage, index) => {
                          return (
                            <div
                              key={index}
                              draggable
                              onDragStart={() => (dragImage.current = index)}
                              onDragEnter={() =>
                                (draggedOverImage.current = index)
                              }
                              onDragEnd={() => handleSort(QualityImages, dragImage, draggedOverImage, seQualityImages)}
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
                                        seQualityImages,
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
                                    seQualityImages,
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






                  <div className="flex flex-col gap-5.5 p-6.5">
                    <div>
                      <label className="mb-3 block py-4 px-2 text-sm font-medium  ">
                        Sub Category Name
                      </label>

                      <Field
                        type="text"
                        name="name"
                        placeholder="Title"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
                      />

                      <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
                    </div>

                    <div className='flex  gap-0 sm:gap-10 flex-wrap sm:flex-nowrap'  >
                      <div className='w-full'>
                        <label className="block py-4 px-2 text-sm font-mediu text-white">
                          BannerHeading
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

                      <div className='w-full'>
                        <label className="block py-4 px-2 text-sm font-mediu text-white">
                          BannerText
                        </label>
                        <Field
                          type="text"
                          name="BannerText"
                          placeholder="BannerText"
                          className={`primary-input ${formik.touched.BannerText && formik.errors.BannerText ? "red_border" : ""
                            }`}
                        />
                        <ErrorMessage name="BannerText" component="div" className="text-red-500 text-sm" />


                      </div>





                    </div>


                    <div>
                      <label className="mb-3 block py-4 px-2 text-sm font-medium  ">
                        Custom Url
                      </label>

                      <Field

                        type="text"
                        name="custom_url"
                        placeholder="Custom Url"
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
                      />
                      <ErrorMessage name="custom_url" component="div" className="text-red-500 text-sm" />
                    </div>
                    <div>
                      <label className="mb-3 block py-4 px-2 text-sm font-medium  ">
                        Category Description
                      </label>
                      <TinyMCEEditor name="description" />
                      {formik.touched.description && formik.errors.description && (
                        <div className="text-red-500 text-sm">{formik.errors.description}</div>
                      )}
                    </div>


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
                          <h3 className="font-medium  ">
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


                    <div className="rounded-sm border border-stroke bg-primary mt-5">
                      <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
                        <h3 className="font-medium  ">
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
                            value={formik.values.categoryHeroToptext
                            }
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
                          <h3 className="font-medium  ">
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


                    <div className="rounded-sm border border-stroke bg-primary mt-5">


                      <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
                        <h3 className="font-medium  ">
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


                    <div className="flex gap-4 mt-4">
                      <div className="w-2/4">
                        <label className="mb-3 block text-sm font-medium  ">
                          collectionHeading
                        </label>
                        <Field
                          type="text"
                          name="collectionHeading"
                          placeholder="collectionHeading"
                          className={`primary-input ${formik.touched.collectionHeading && formik.errors.collectionHeading ? "border-red-500" : ""
                            }`}
                        />

                      </div>
                      <div className="w-2/4">
                        <label className="mb-3 block text-sm font-medium  ">
                          collectionMainHeading
                        </label>
                        <Field
                          type="text"
                          name="collectionMainHeading"
                          placeholder="collectionMainHeading"
                          className={`primary-input ${formik.touched.collectionMainHeading && formik.errors.collectionMainHeading ? "border-red-500" : ""
                            }`}
                        />

                      </div>
                    </div>



                    <div className="rounded-sm border border-stroke bg-primary mt-5">


                      <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
                        <h3 className="font-medium  ">
                          QualityHeadings
                        </h3>
                      </div>


                      <div className="flex flex-col py-4 px-2">
                        <FieldArray name="QualityHeadings">
                          {({ push, remove }) => (
                            <div className="flex flex-col gap-2">
                              {formik.values.QualityHeadings &&
                                formik.values.QualityHeadings.map((model: AdditionalInformation, index: number) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <input
                                      type="text"
                                      name={`QualityHeadings[${index}].name`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik?.values?.QualityHeadings?.[index].name}
                                      placeholder="Heading name"
                                      className="primary-input"
                                    />
                                    <input
                                      type="text"
                                      name={`QualityHeadings[${index}].detail`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values?.QualityHeadings?.[index].detail}
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
                                QualityHeadings
                              </button>
                            </div>
                          )}
                        </FieldArray>
                      </div>


                    </div>


                    <div className="rounded-sm border border-stroke bg-primary mt-5">


                      <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
                        <h3 className="font-medium  ">
                          QualityText
                        </h3>
                      </div>


                      <div className="flex flex-col py-4 px-2">
                        <FieldArray name="QualityText">
                          {({ push, remove }) => (
                            <div className="flex flex-col gap-2">
                              {formik.values.QualityText &&
                                formik.values.QualityText.map((model: AdditionalInformation, index: number) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <input
                                      type="text"
                                      name={`QualityText[${index}].name`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik?.values?.QualityText?.[index].name}
                                      placeholder="Heading name"
                                      className="primary-input"
                                    />
                                    <input
                                      type="text"
                                      name={`QualityText[${index}].detail`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values?.QualityText?.[index].detail}
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
                                QualityText
                              </button>
                            </div>
                          )}
                        </FieldArray>
                      </div>


                    </div>



                    <div className="rounded-sm border border-stroke bg-primary mt-5">
                      <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
                        <h3 className="font-medium  ">
                          CustomHeading
                        </h3>
                      </div>


                      <div className="flex flex-col py-4 px-2">
                        <FieldArray name="CustomHeading">
                          {({ push, remove }) => (
                            <div className="flex flex-col gap-2">
                              {formik.values.CustomHeading &&
                                formik.values.CustomHeading.map((model: AdditionalInformation, index: number) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <input
                                      type="text"
                                      name={`CustomHeading[${index}].name`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik?.values?.CustomHeading?.[index].name}
                                      placeholder="Heading name"
                                      className="primary-input"
                                    />
                                    <input
                                      type="text"
                                      name={`CustomHeading[${index}].detail`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values?.CustomHeading?.[index].detail}
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
                                CustomHeading
                              </button>
                            </div>
                          )}
                        </FieldArray>
                      </div>


                    </div>

                    <div className="rounded-sm border border-stroke bg-primary mt-5">
                      <div className="border-b border-stroke py-4 px-6 dark:border-strokedark">
                        <h3 className="font-medium  ">
                          CustomText
                        </h3>
                      </div>
                      <div className="flex flex-col py-4 px-2">
                        <FieldArray name="CustomText">
                          {({ push, remove }) => (
                            <div className="flex flex-col gap-2">
                              {formik.values.CustomText &&
                                formik.values.CustomText.map((model: AdditionalInformation, index: number) => (
                                  <div
                                    key={index}
                                    className="flex items-center gap-2"
                                  >
                                    <input
                                      type="text"
                                      name={`CustomText[${index}].name`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik?.values?.CustomText?.[index].name}
                                      placeholder="Heading name"
                                      className="primary-input"
                                    />
                                    <input
                                      type="text"
                                      name={`CustomText[${index}].detail`}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      value={formik.values?.CustomText?.[index].detail}
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
                                CustomText
                              </button>
                            </div>
                          )}
                        </FieldArray>
                      </div>


                    </div>


                    <div className="flex gap-4 mt-4">
                      <div className="w-2/4">
                        <label className="mb-3 block text-sm font-medium  ">
                          Product_Section_heading
                        </label>
                        <Field
                          type="text"
                          name="Product_Section_heading"
                          placeholder="Meta Title"
                          className={`primary-input ${formik.touched.Product_Section_heading && formik.errors.Product_Section_heading ? "border-red-500" : ""
                            }`}
                        />
                      </div>
                      <div className="w-2/4">
                        <label className="mb-3 block text-sm font-medium  ">
                          bottomText
                        </label>
                        <Field
                          type="text"
                          name="bottomText"
                          placeholder="bottomText"
                          className={`primary-input ${formik.touched.bottomText && formik.errors.bottomText ? "border-red-500" : ""
                            }`}
                        />
                      </div>
                    </div>




                    <div className="flex gap-4 mt-4">
                      <div className="w-2/4">
                        <label className="mb-3 block text-sm font-medium  ">
                          bodyHeading
                        </label>
                        <Field
                          type="text"
                          name="bodyHeading"
                          placeholder="Meta bodyHeading"
                          className={`primary-input ${formik.touched.bodyHeading && formik.errors.bodyHeading ? "border-red-500" : ""
                            }`}
                        />

                      </div>
                      <div className="w-2/4">
                        <label className="mb-3 block text-sm font-medium  ">
                          bodyMainHeading
                        </label>
                        <Field
                          type="text"
                          name="bodyMainHeading"
                          placeholder="Canonical Tag"
                          className={`primary-input ${formik.touched.bodyMainHeading && formik.errors.bodyMainHeading ? "border-red-500" : ""
                            }`}
                        />

                      </div>

                      <div className="w-2/4">
                        <label className="mb-3 block text-sm font-medium  ">
                          bodyText
                        </label>
                        <Field
                          type="text"
                          name="bodyText"
                          placeholder="Canonical Tag"
                          className={`primary-input ${formik.touched.bodyText && formik.errors.bodyText ? "border-red-500" : ""
                            }`}
                        />

                      </div>


                    </div>











                    <div className="flex gap-4 mt-4">
                      <div className="w-2/4">
                        <label className="mb-3 block text-sm font-medium  ">
                          explore_Heading
                        </label>
                        <Field
                          type="text"
                          name="explore_Heading"
                          placeholder="Meta explore_Heading"
                          className={`primary-input ${formik.touched.explore_Heading && formik.errors.explore_Heading ? "border-red-500" : ""
                            }`}
                        />

                      </div>
                      <div className="w-2/4">
                        <label className="mb-3 block text-sm font-medium  ">
                          explore_main_heading
                        </label>
                        <Field
                          type="text"
                          name="explore_main_heading"
                          placeholder="Canonical Tag"
                          className={`primary-input ${formik.touched.explore_main_heading && formik.errors.explore_main_heading ? "border-red-500" : ""
                            }`}
                        />
                      </div>


                      <div className="w-2/4">
                        <label className="mb-3 block text-sm font-medium  ">
                          explore_description
                        </label>
                        <Field
                          type="text"
                          name="explore_description"
                          placeholder="Canonical Tag"
                          className={`primary-input ${formik.touched.explore_description && formik.errors.explore_description ? "border-red-500" : ""
                            }`}
                        />
                      </div>



                    </div>





                    <div className="flex gap-4 mt-4">
                      <div className="w-2/4">
                        <label className="mb-3 block text-sm font-medium  ">
                          Meta Title
                        </label>
                        <Field
                          type="text"
                          name="Meta_Title"
                          placeholder="Meta Title"
                          className={`primary-input ${formik.touched.Meta_Title && formik.errors.Meta_Title ? "border-red-500" : ""
                            }`}
                        />
                        {formik.touched.Meta_Title && formik.errors.Meta_Title && (
                          <div className="text-red text-sm">{formik.errors.Meta_Title as string}</div>
                        )}
                      </div>
                      <div className="w-2/4">
                        <label className="mb-3 block text-sm font-medium  ">
                          Canonical Tag
                        </label>
                        <Field
                          type="text"
                          name="Canonical_Tag"
                          placeholder="Canonical Tag"
                          className={`primary-input ${formik.touched.Canonical_Tag && formik.errors.Canonical_Tag ? "border-red-500" : ""
                            }`}
                        />
                        {formik.touched.Canonical_Tag && formik.errors.Canonical_Tag && (
                          <div className="text-red text-sm">{formik.errors.Canonical_Tag as string}</div>
                        )}
                      </div>
                    </div>







                    <div className="mt-4">
                      <label className="mb-3 block text-sm font-medium  ">
                        Meta Description
                      </label>
                      <Field
                        as="textarea"
                        name="Meta_Description"
                        placeholder="Meta Description"
                        className={`primary-input ${formik.touched.Meta_Description && formik.errors.Meta_Description ? "border-red-500" : ""
                          }`}
                      />
                      {formik.touched.Meta_Description && formik.errors.Meta_Description && (
                        <div className="text-red text-sm">{formik.errors.Meta_Description as string}</div>
                      )}
                    </div>

                    <div className="flex gap-4 mt-2">
                      <div className="w-full">
                        <label className="mb-3 block text-sm font-medium  ">
                          Short Description
                        </label>
                        <Field
                          type="text"
                          name="short_description"
                          placeholder="Short Description"
                          className={`primary-input ${formik.touched.short_description && formik.errors.short_description ? "border-red-500" : ""
                            }`}
                        />
                        {formik.touched.short_description && formik.errors.short_description && (
                          <div className="text-red text-sm">{formik.errors.short_description as string}</div>
                        )}
                      </div>
                    </div>
                    <div>

                      <label className="mb-3 block py-4 px-2 text-sm font-medium  ">
                        Select Parent Category (atleat one)
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                        <Field
                          as="select"
                          name="category"

                          className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input  dark:focus:border-primary"
                        >
                          <option className='bg-primary' value="" disabled>
                            Select Category
                          </option>

                          {categoriesList.map((category) => (
                            <option className="bg-primary" key={category.id} value={category.id}>
                              {category.name}
                            </option>
                          ))}
                        </Field>

                      </div>
                      <ErrorMessage name="category" component="div" className="text-red-500 " />
                    </div>
                    <Field name="status">
                      {({ field, form }: import('formik').FieldProps) => (
                        <div className="flex gap-4 items-center my-4">
                          <label className="font-semibold">Sub Category Status:</label>

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
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="mt-4 dashboard_primary_button not-[]:cursor-pointer"
                disabled={loading}
              >
                {loading ? "loading.." : 'Submit'}
              </button>
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
          </Form>
        );
      }}
    </Formik>

  );
};

export default AddSubcategory