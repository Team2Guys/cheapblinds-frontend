"use client";
import React, { useEffect, useRef, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { useMutation } from "@apollo/client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Admin } from "types/type";
import showToast from "components/Toaster/Toaster";
import revalidateTag from "components/ServerActons/ServerAction";
import { CREATE_ADMIN, UPDATE_ADMIN } from "graphql/Admins";
import { useSession } from "next-auth/react";
import { Modal } from "antd";
import { initialAdminValues } from "data/InitialValues";
import { checkboxAdminData } from "data/data";
import { validationAdminSchema } from "data/Validations";
import { adminCheckBox, CreateAdminProps } from "types/admin";
import { ProductImage } from "types/prod";
import ImageUploader from "components/ImageUploader/ImageUploader";
import {
  handleCropClick,
  handleCropModalCancel,
  handleCropModalOk,
  handleImageAltText,
  ImageRemoveHandler,
  onCropComplete,
  onImageLoad,
} from "utils/helperFunctions";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";
import ReactCrop, { Crop } from "react-image-crop";

const CreateAdmin: React.FC<CreateAdminProps> = ({
  setselecteMenu,
  EditAdminValue,
  EditInitialValues,
  setEditProduct,
}) => {
  const updateFlag = !!(EditAdminValue && EditInitialValues);
  const initialFormValues: Admin = updateFlag ? EditAdminValue : initialAdminValues;
  const [posterimageUrl, setposterimageUrl] = useState<ProductImage[] | undefined>(
    initialFormValues.posterImageUrl ? [initialFormValues.posterImageUrl] : [],
  );

  const [isCropModalVisible, setIsCropModalVisible] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const session = useSession();
  const finalToken = session.data?.accessToken;
  const formikValuesRef = useRef<Admin>(initialFormValues);

  const [createAdmin] = useMutation(CREATE_ADMIN);
  const [updateAdmin] = useMutation(UPDATE_ADMIN);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formValues] = useState<Admin>(initialFormValues);

  const hasUnsavedChanges = (): boolean => {
    return JSON.stringify(initialFormValues) !== JSON.stringify(formikValuesRef.current);
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges()) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    const handlePopState = () => {
      if (hasUnsavedChanges()) {
        window.history.pushState(null, "", window.location.href);
        Modal.confirm({
          title: "Unsaved Changes",
          content: "You have unsaved changes. Do you want to discard them?",
          okText: "Discard Changes",
          cancelText: "Cancel",
          onOk: () => {
            setselecteMenu("AllAdmin");
            setEditProduct(null);
          },
        });
      } else {
        setselecteMenu("AllAdmin");
        setEditProduct(null);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [formValues]);

  const handleBack = () => {
    if (hasUnsavedChanges()) {
      Modal.confirm({
        title: "Unsaved Changes",
        content: "You have unsaved changes. Do you want to discard them?",
        okText: "Discard Changes",
        cancelText: "Cancel",
        onOk: () => {
          setselecteMenu("AllAdmin");
          setEditProduct(null);
        },
      });
      return;
    }
    setselecteMenu("AllAdmin");
    setEditProduct(null);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationAdminSchema}
        onSubmit={async (values: Admin, { setSubmitting }) => {
          setLoading(true);
          try {
            const posterImage = posterimageUrl?.[0];
            const inputData = {
              ...(updateFlag ? { id: EditInitialValues?.id } : {}),
              ...values,
              posterImageUrl: posterImage,
            };
            // eslint-disable-next-line
            const { __typename, ...input } = inputData;
            const mutationFn = updateFlag ? updateAdmin : createAdmin;

            await mutationFn({
              variables: { input },
              context: {
                headers: {
                  authorization: `Bearer ${finalToken}`,
                },
              },
            });

            setSubmitting(false);
            setselecteMenu("AllAdmin");
            setEditProduct(null);
            setposterimageUrl(undefined);
            showToast("success", `Admin ${updateFlag ? "updated" : "created"} successfully`);
            revalidateTag("Admins");
            // eslint-disable-next-line
          } catch (err: any) {
            setError(err?.message || "An unexpected error occurred.");
            alert(err?.message || "An error occurred");
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ handleSubmit, values, setValues }) => {
          formikValuesRef.current = values;
          return (
            <>
              <button className="dashboard_primary_button mb-4" onClick={handleBack}>
                <IoMdArrowRoundBack /> Back
              </button>

              <Form
                onSubmit={handleSubmit}
                className="bg-white dark:bg-black/50 backdrop-blur-3xl p-6 rounded-lg shadow-lg"
              >
                <h2 className="text-2xl text-center font-bold mb-6 text-black dark:text-white">
                  {updateFlag ? "Edit Admin" : "Create New Admin"}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label
                      htmlFor="fullname"
                      className="block text-sm font-medium text-black dark:text-white mb-1"
                    >
                      Full Name
                    </label>
                    <Field
                      type="text"
                      id="fullname"
                      name="fullname"
                      placeholder="Full Name"
                      className="primary-input"
                    />
                    <ErrorMessage name="fullname" component="p" className="text-red-500 text-sm" />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-black dark:text-white mb-1"
                    >
                      Email
                    </label>
                    <Field
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Enter Email"
                      className="primary-input"
                    />
                    <ErrorMessage name="email" component="p" className="text-red-500 text-sm" />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-black dark:text-white mb-1"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter Password"
                    className="primary-input"
                  />
                  <ErrorMessage name="password" component="p" className="text-red-500 text-sm" />
                </div>

                <div className="rounded-sm border border-stroke mb-4">
                  <div className="border-b border-stroke px-4">
                    <h3 className="primary-label">Add Profile Photo</h3>
                  </div>

                  {posterimageUrl && posterimageUrl.length > 0 ? (
                    <div className="p-3">
                      {posterimageUrl.map((item, index) => (
                        <div key={index}>
                          <div className="relative group rounded-lg overflow-hidden shadow-md w-52 h-52 transform transition-transform duration-300 hover:scale-105">
                            <div className="absolute top-1 right-1 invisible group-hover:visible text-red z-10 rounded-full">
                              <RxCross2
                                className="cursor-pointer border border-black text-red-500 dark:text-red-700"
                                size={17}
                                onClick={() => {
                                  ImageRemoveHandler(item.public_id, setposterimageUrl);
                                }}
                              />
                            </div>
                            <Image
                              onClick={() =>
                                handleCropClick(item.imageUrl, setImageSrc, setIsCropModalVisible)
                              }
                              className="cursor-crosshair inset-0"
                              fill
                              loading="lazy"
                              src={item.imageUrl || ""}
                              alt={`productImage-${index}`}
                            />
                          </div>
                          <div className="my-2">
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
                                  "altText",
                                )
                              }
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <ImageUploader setImagesUrl={setposterimageUrl} />
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  {checkboxAdminData.map((checkbox) => (
                    <label key={checkbox.name} className="flex items-center gap-2">
                      <Field
                        type="checkbox"
                        name={checkbox.name}
                        className="h-4 w-4 accent-black dark:accent-primary border-gray-300 rounded"
                      />
                      <span className="text-sm text-black dark:text-white">{checkbox.label}</span>
                    </label>
                  ))}
                </div>

                <div className="flex justify-between mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      const clearedPermissions: Partial<Record<keyof adminCheckBox, boolean>> = {};
                      checkboxAdminData.forEach((cb) => {
                        clearedPermissions[cb.name as keyof adminCheckBox] = false;
                      });
                      setValues({ ...values, ...clearedPermissions });
                    }}
                    className="dashboard_primary_button"
                  >
                    Clear All
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const allPermissions: Partial<Record<keyof adminCheckBox, boolean>> = {};
                      checkboxAdminData.forEach((cb) => {
                        allPermissions[cb.name as keyof adminCheckBox] = true;
                      });
                      setValues({ ...values, ...allPermissions });
                    }}
                    className="dashboard_primary_button"
                  >
                    Mark All Permissions
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full flex justify-center dashboard_primary_button ${loading ? "cursor-not-allowed" : "cursor-pointer"}`}
                >
                  {loading ? "Loading..." : updateFlag ? "Update Admin" : "Add Admin"}
                </button>

                {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

                <Modal
                  title="Crop Image"
                  open={isCropModalVisible}
                  onOk={() =>
                    handleCropModalOk(
                      croppedImage,
                      imageSrc,
                      setIsCropModalVisible,
                      setCroppedImage,
                      setposterimageUrl,
                    )
                  }
                  onCancel={() => handleCropModalCancel(setIsCropModalVisible, setCroppedImage)}
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
            </>
          );
        }}
      </Formik>
    </div>
  );
};

export default CreateAdmin;
