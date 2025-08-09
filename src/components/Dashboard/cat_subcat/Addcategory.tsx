'use client';
import React, { SetStateAction, useEffect, useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import { handleImageAltText, ImageRemoveHandler } from 'utils/helperFunctions';
import Toaster from 'components/Toaster/Toaster';
import { Formik, Form, FormikHelpers, ErrorMessage, Field } from 'formik';
import { IoMdArrowRoundBack } from 'react-icons/io';
import ImageUploader from 'components/ImageUploader/ImageUploader';
import { ProductImage } from 'types/prod';
import { Category, EDIT_CATEGORY } from 'types/cat';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Modal } from 'antd';
import { centerAspectCrop } from 'types/product-crop';
import TinyMCEEditor from 'components/Dashboard/tinyMc/MyEditor';
import revalidateTag from 'components/ServerActons/ServerAction';
import { categoryValidationSchema } from 'data/Validations';
import { categoryInitialValues } from 'data/InitialValues';
import { uploadPhotosToBackend } from 'utils/fileUploadhandlers';
import { useSession } from 'next-auth/react';
import ApoloClient from 'utils/AppoloClient';
import { CREATE_CATEGORY, GET_ALL_CATEGORIES, UPDATE_CATEGORY } from 'graphql/categories';

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
      breadCrum: editCategory.breadCrum || "",
      status: editCategory?.status || 'DRAFT',
    }
    : null;


  const session = useSession()
  const finalToken = session.data?.accessToken
  const [posterimageUrl, setposterimageUrl] = useState<ProductImage[] | undefined>((editCategory && editCategory.posterImageUrl) ? [editCategory.posterImageUrl] : undefined);
  const [BannerImageUrl, setBannerImageUrl] = useState<ProductImage[] | undefined>(editCategory && editCategory?.Banners ? [editCategory?.Banners] : undefined);
  const [loading, setloading] = useState<boolean>(false);
  const [editCategoryName, setEditCategoryName] = useState<EDIT_CATEGORY | null | undefined>(CategoryName);
  const [isCropModalVisible, setIsCropModalVisible] = useState<boolean>(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  // const dragImage = useRef<number | null>(null);
  // const draggedOverImage = useRef<number | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const onSubmit = async (values: EDIT_CATEGORY, { resetForm }: FormikHelpers<EDIT_CATEGORY>) => {
    try {

      const posterImageUrl = posterimageUrl && posterimageUrl[0] || {};
      const Banner = BannerImageUrl && BannerImageUrl[0];
      if (!posterImageUrl) return Toaster('error', 'Please select relevant Images');
      const newValue = { ...values, posterImageUrl, Banners: Banner, last_editedBy: session.data?.user.fullname };
      const updateFlag = editCategoryName ? true : false;
      setloading(true);
      if (updateFlag) {
        await ApoloClient.mutate({
          mutation: UPDATE_CATEGORY,
          //   context: {
          //     headers: {
          //       authorization: `Bearer ${finalToken}`,
          //     },
          //     credentials: 'include',
          //   },
          variables: { input: { id: Number(editCategory?.id), ...newValue } },
          refetchQueries: [{ query: GET_ALL_CATEGORIES }],
        });
      } else {
        await ApoloClient.mutate({
          mutation: CREATE_CATEGORY,
          variables: { input: newValue },
          refetchQueries: [{ query: GET_ALL_CATEGORIES }],
          // context: {
          //   headers: {
          //     authorization: `Bearer ${finalToken}`,
          //   },
          //   credentials: 'include',
          // },

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

  const handleBack = (values: EDIT_CATEGORY) => {
    const initialFormValues = editCategoryName || categoryInitialValues;

    let isPosterChanged: boolean;
    let isBannerChanged: boolean;

    if (editCategory) {
      // Editing mode
      isPosterChanged =
        JSON.stringify(editCategory.posterImageUrl ? [editCategory.posterImageUrl] : undefined) !==
        JSON.stringify(posterimageUrl);

      isBannerChanged =
        JSON.stringify(editCategory.Banners ? [editCategory.Banners] : undefined) !==
        JSON.stringify(BannerImageUrl);
    } else {
      // Adding mode (initially no images)
      isPosterChanged = !!posterimageUrl && posterimageUrl.length > 0;
      isBannerChanged = !!BannerImageUrl && BannerImageUrl.length > 0;
    }

    const isFormChanged = JSON.stringify(initialFormValues) !== JSON.stringify(values);

    if (isPosterChanged || isBannerChanged || isFormChanged) {
      Modal.confirm({
        title: "Unsaved Changes",
        content: "You have unsaved changes. Do you want to discard them?",
        okText: "Discard Changes",
        cancelText: "Cancel",
        onOk: () => {
          setMenuType("Categories");
        },
      });
      return;
    }
    setMenuType("Categories");
    return;
  };

  return (
    <Formik
      initialValues={
        editCategoryName ? editCategoryName : categoryInitialValues
      }
      validationSchema={categoryValidationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <>
            <p
              className="dashboard_primary_button"
              onClick={() => handleBack(formik.values)}
            >
              <IoMdArrowRoundBack /> Back
            </p>
            <Form onSubmit={formik.handleSubmit}>
              <div className="flex justify-center  bg-primary ">
                <div className="flex flex-col gap-5 bg-primary md:gap-9 w-full lg:w-4/5 xl:w-3/5  ">
                  <div className="rounded-sm border border-stroke bg-primary  p-3">
                    <div className="rounded-sm border bg-primary border-stroke">
                      <div className="border-b bg-primary border-stroke py-4 px-2">
                        <h3 className="font-medium  text-white">
                          Add Poster Image
                        </h3>
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
                                  className="border w-full rounded-md border-stroke px-2 text-14 py-2 focus:border-primary active:border-primary outline-none"
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

                      <div>
                        <label className=" block py-4 px-2 text-sm font-medium text-white">
                          Category Description
                        </label>
                        <TinyMCEEditor name="description" />
                        <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
                      </div>
                      <div className="input_container">
                        <div className='w-full mb-3'>
                          <label className="mb-3 block text-sm font-medium text-white">
                            Short Description
                          </label>
                          <input
                            type="text"
                            name="short_description"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.short_description}
                            placeholder="Short Description"
                            className={`primary-input ${formik.touched.short_description &&
                              formik.errors.short_description
                              ? 'red_border'
                              : ''
                              }`}
                          />
                          {formik.touched.short_description &&
                            formik.errors.short_description ? (
                            <div className="text-red text-sm">
                              {formik.errors.short_description as string}
                            </div>
                          ) : null}
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
              <div className="flex justify-center mt-4">
                <button
                  type="submit"
                  className="dashboard_primary_button "
                  disabled={loading}
                >
                  {loading ? "loading..." : 'Submit'}
                </button>
              </div>
            </Form>
          </>
        );
      }}
    </Formik>
  );
};

export default AddCategory
