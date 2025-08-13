'use client';
import React, { useEffect, useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import { handleImageAltText, ImageRemoveHandler } from 'utils/helperFunctions';
import { Formik, Form, FormikHelpers, Field, ErrorMessage } from 'formik';
import { IoMdArrowRoundBack } from 'react-icons/io';
import showToast from 'components/Toaster/Toaster';
import { DASHBOARD_ADD_SUBCATEGORIES_PROPS } from 'types/PagesProps';
import { ProductImage } from 'types/prod';
import { ISUBCATEGORY_EDIT } from 'types/cat';
import ImageUploader from 'components/ImageUploader/ImageUploader';
import { useMutation } from '@apollo/client';
import revalidateTag from 'components/ServerActons/ServerAction';
import ReactCrop, { Crop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { Modal } from 'antd';
import { centerAspectCrop } from 'types/product-crop';
import TinyMCEEditor from 'components/Dashboard/tinyMc/MyEditor';
import { subcategoryInitialValues } from 'data/InitialValues';
import { subcategoryValidationSchema } from 'data/Validations';
import { uploadPhotosToBackend } from 'utils/fileUploadhandlers';
import { useSession } from 'next-auth/react';
import { CREATE_SUBCATEGORY, GET_ALL_SUBCATEGORIES, UPDATE_SUBCATEGORY } from 'graphql/categories';

const AddSubcategory = ({
  seteditCategory,
  editCategory,
  setMenuType,
  categoriesList,
}: DASHBOARD_ADD_SUBCATEGORIES_PROPS) => {

  const CategoryName: ISUBCATEGORY_EDIT | undefined = editCategory && editCategory.name
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
      category: editCategory?.category?.id || ''
    }
    : undefined;

  const [posterimageUrl, setposterimageUrl] = useState<ProductImage[] | undefined>((editCategory && editCategory?.posterImageUrl) ? [editCategory?.posterImageUrl] : undefined);
  const [BannerImageUrl, setBannerImageUrl] = useState<ProductImage[] | undefined>(editCategory && editCategory?.Banners ? [editCategory?.Banners] : undefined);


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
  // const dragImage = useRef<number | null>(null);
  // const draggedOverImage = useRef<number | null>(null);

  const onSubmit = async (values: ISUBCATEGORY_EDIT, { resetForm }: FormikHelpers<ISUBCATEGORY_EDIT>) => {
    if (!values.category) {
      return showToast('warn', 'Select parent category!!');
    } try {


      setloading(true);
      const posterImageUrl = posterimageUrl && posterimageUrl[0];
      const Banner = BannerImageUrl && BannerImageUrl[0];
      const newValue = { ...values, posterImageUrl: posterImageUrl || {}, Banners: Banner, last_editedBy: session.data?.user.fullname, category: Number(values.category) };

      const updateFlag = editCategoryName ? true : false;
      console.log(newValue, 'newValue')
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
        })
        showToast('success', 'Sub Category has been successfully updated!');
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

  const handleBack = (values: ISUBCATEGORY_EDIT) => {
    const initialFormValues = editCategoryName || subcategoryInitialValues;

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

    const isFormChanged = JSON.stringify(initialFormValues) !== JSON.stringify({ ...values, category: values.category === '' ? values.category : Number(values.category) });
    if (isPosterChanged || isBannerChanged || isFormChanged) {
      Modal.confirm({
        title: "Unsaved Changes",
        content: "You have unsaved changes. Do you want to discard them?",
        okText: "Discard Changes",
        cancelText: "Cancel",
        onOk: () => {
          setMenuType("Sub Categories");
        },
      });
      return;
    }
    setMenuType("Sub Categories");
    return;
  };


  return (

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
                onClick={() => handleBack(formik.values)}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 md:gap-9 w-full rounded-sm border border-stroke p-4 bg-white dark:bg-black/50 backdrop-blur-3xl">
              <div>


                <div className="rounded-sm border border-stroke">
                  <div className="border-b border-stroke py-4 px-2 ">
                    <h3 className="font-medium  text-black dark:text-white">
                      Add Poster Image

                    </h3>
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

                <div className="rounded-sm border mt-4 border-stroke dark:border-strokedark dark:bg-boxdark">
                  <div className="border-b border-stroke py-4 px-2 ">
                    <h3 className="font-medium text-black dark:text-white">
                      Add Banner Image
                    </h3>
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

                <div className="flex flex-col gap-4 md:py-6">
                  <div>
                    <label className="mb-3 block py-1 px-2 text-sm font-medium text-black dark:text-white">
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
                    <label className="mb-3 block py-1 px-2 text-sm font-medium text-black dark:text-white">
                      Custom Url
                    </label>

                    <Field

                      type="text"
                      name="custom_url"
                      placeholder="Custom Url"
                      className="dashboard_input"
                    />
                    <ErrorMessage name="custom_url" component="div" className="text-red-500 text-sm" />
                  </div>

                  <div>

                    <label className="mb-3 block py-1 px-2 text-sm font-medium text-black dark:text-white">
                      Select Parent Category (atleat one)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                      <Field
                        as="select"
                        name="category"

                        className="dashboard_input"
                      >
                        <option className='' value="" disabled>
                          Select Category
                        </option>

                        {categoriesList.map((category) => (
                          <option key={category.id} value={category.id}>
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
                        <label className="font-semibold text-black dark:text-white">Sub Category Status:</label>

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
                </div>


              </div>
              <div>
                <div>
                  <label className="mb-3 block pb-2 pt-3 px-2 text-sm font-medium text-black dark:text-white">
                    Category Description
                  </label>
                  <TinyMCEEditor name="description" />
                  {formik.touched.description && formik.errors.description && (
                    <div className="text-red-500 text-sm">{formik.errors.description}</div>
                  )}
                </div>



                <div className="flex gap-4 mt-4">
                  <div className="w-2/4">
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
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
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
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
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
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
                    <label className="mb-3 block text-sm font-medium text-black dark:text-white">
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