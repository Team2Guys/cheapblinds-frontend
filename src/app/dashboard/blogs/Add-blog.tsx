'use client';
import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import ImageUploader from 'components/ImageUploader/ImageUploader';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import Image from 'next/image';
import { ProductImage } from 'types/prod';
import { handleImageAltText, ImageRemoveHandler } from 'utils/helperFunctions';
import { IBlog } from 'types/general';
import { ApolloError, useMutation } from '@apollo/client';
import showToast from 'components/Toaster/Toaster';
import { CREATE_BLOG, UPDATE_BLOG } from 'graphql/blogs';
import revalidateTag from 'components/ServerActons/ServerAction';
import TinyMCEEditor from 'components/Dashboard/tinyMc/MyEditor';
import { ISUBCATEGORY } from 'types/cat';
import { useSession } from 'next-auth/react';
import { Modal } from 'antd';

const TextInputField = ({ name, label }: { name: string; label: string }) => (
  <div>
    <label className="primary-label">{label}</label>
    <Field name={name} className="dashboard_input" />
    <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
  </div>
);

interface AddBlogProps {
  setselecteMenu: React.Dispatch<React.SetStateAction<string>>;
  editblog?: IBlog;
  subCategories: ISUBCATEGORY[];
}

const validationSchema = Yup.object({
  title: Yup.string().required('Title is required'),
  content: Yup.string().required('Content is required'),
  category: Yup.string().required('Category is required'),
  Canonical_Tag: Yup.string().nullable(),
  Meta_Description: Yup.string().nullable(),
  Meta_Title: Yup.string().nullable(),
  redirectionUrl: Yup.string().nullable(),
});

const AddBlogs = ({ setselecteMenu, editblog, subCategories }: AddBlogProps) => {
  const [posterImage, setposterImage] = useState<ProductImage[]>();
  const [createBlogMutation, { loading }] = useMutation(CREATE_BLOG);
  const [updateBlogMutation, { loading: updating }] = useMutation(UPDATE_BLOG);
  const session = useSession()
  const finalToken = session.data?.accessToken
  const [blog] = useState<IBlog>({
    title: editblog?.title || '',
    content: editblog?.content || '',
    custom_url: editblog?.custom_url || '',
    category: editblog?.category || '',
    status: editblog?.status || 'DRAFT',
    isPublished: editblog?.isPublished || false,
    posterImage: editblog?.posterImage || undefined,
    last_editedBy: editblog?.last_editedBy || '',
    Canonical_Tag: editblog?.Canonical_Tag || '',
    Meta_Description: editblog?.Meta_Description || '',
    Meta_Title: editblog?.Meta_Title || '',
    redirectionUrl: editblog?.redirectionUrl || '',
  })


  useEffect(() => {
    if (editblog?.posterImage) {
      setposterImage([editblog.posterImage]);
    }
  }, [editblog]);



  const handleSubmit = async (values: IBlog, { resetForm }: FormikHelpers<IBlog>) => {
    try {
      const payload = {
        ...values,
        posterImage: posterImage?.[0] || null,
      };

      if (editblog?.id) {
        await updateBlogMutation({
          context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
            credentials: 'include',
          },
          variables: {
            updateBlogInput: {
              id: editblog.id,
              ...payload,
            },
          },
        });
        showToast('success', 'Blog updated successfully!');
      } else {
        await createBlogMutation({
          context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
            credentials: 'include',
          },
          variables: {
            createBlogInput: payload,
          },
        });
        showToast('success', 'Blog created successfully!');
      }

      setselecteMenu('All Blogs');
      revalidateTag('blogs');
      resetForm();
    } catch (error) {
      const graphQLError =
        (error as ApolloError)?.graphQLErrors?.[0]?.message || 'Something went wrong';
      showToast('error', graphQLError);
    }
  };


    const handleBack = (values: IBlog) => {
      const initialFormValues = blog;
  
      let isPosterChanged: boolean;
  
      if (editblog) {
        isPosterChanged =
          JSON.stringify(editblog.posterImage ? [editblog.posterImage] : undefined) !==
          JSON.stringify(posterImage);

      } else {
        isPosterChanged = !!posterImage && posterImage.length > 0;
      }
      
      const isFormChanged = JSON.stringify(initialFormValues) !== JSON.stringify(values);
      console.log(editblog?.posterImage, 'initialFormValues', posterImage)
      if (isPosterChanged || isFormChanged) {
        Modal.confirm({
          title: "Unsaved Changes",
          content: "You have unsaved changes. Do you want to discard them?",
          okText: "Discard Changes",
          cancelText: "Cancel",
          onOk: () => {
            setselecteMenu("All Blogs");
          },
        });
        return;
      }
      setselecteMenu("All Blogs");
      return;
    };


  return (
    <Formik
      enableReinitialize
      initialValues={blog}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Form>
          <div className='flex flex-wrap mb-5 gap-2 justify-between items-center'>
            <p
              className="dashboard_primary_button"
              onClick={() => handleBack(formik.values)}
            >
              <IoMdArrowRoundBack /> Back
            </p>
            <div className="flex justify-center gap-4 items-center">
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
                className="dashboard_primary_button rounded cursor-pointer"
                disabled={loading || updating}
              >
                {loading || updating
                  ? 'Submitting...'
                  : editblog?.id
                    ? 'Update Blog'
                    : 'Submit Blog'}
              </button>
            </div>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-black p-4 xs:p-6 rounded-sm border border-stroke'>
            <div className='space-y-4'>

              <div className="rounded-sm border border-stroke">
                <div className="border-b border-stroke">
                  <h3 className="font-medium text-black dark:text-white py-4 px-2">Add Poster Image</h3>
                </div>
                {posterImage && posterImage.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
                    {posterImage.map((item, index) => (
                      <div
                        key={index}
                        className="relative group  overflow-hidden shadow-md bg-white hover:scale-105 transition-transform p-1"
                      >
                        <div className="absolute top-1 right-1 invisible group-hover:visible text-red bg-white rounded-full">
                          <RxCross2
                            className="cursor-pointer text-red-500"
                            size={20}
                            onClick={() =>
                              ImageRemoveHandler(item.public_id || "", setposterImage)
                            }
                          />
                        </div>
                        <Image
                          src={item.imageUrl}
                          width={300}
                          height={200}
                          alt="Poster"
                          className="w-full h-48 object-cover"
                        />
                        <input
                          type="text"
                          name="altText"
                          className="dashboard_input"
                          placeholder="Alt Text"
                          value={item.altText || ''}
                          onChange={(e) =>
                            handleImageAltText(
                              index,
                              e.target.value,
                              setposterImage,
                              'altText'
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <ImageUploader setImagesUrl={setposterImage} />
                )}
              </div>
              <TextInputField name="title" label="Title" />
              <div>
                <label className="primary-label">
                  Select Category
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  <Field
                    as="select"
                    name="category"

                    className="dashboard_input"
                  >
                    <option value="" disabled>
                      Select Category
                    </option>

                    {subCategories.map((category) => (
                      <option key={category.id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </Field>

                </div>
                <ErrorMessage name="category" component="div" className="text-red-500 " />
              </div>
              <TextInputField name="custom_url" label="custom_url" />
              <Field name="status">
                {({ field, form }: import('formik').FieldProps) => (
                  <div className="flex gap-4 items-center pt-4">
                    <label className="font-semibold">Blog Status:</label>

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
            </div>
            <div className="space-y-4">
              <div>
                <label className="primary-label">Content</label>
                <TinyMCEEditor name="content" />
                <ErrorMessage name="content" component="div" className="text-red-500 text-sm" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextInputField name="Canonical_Tag" label="Canonical Tag" />
                <TextInputField name="redirectionUrl" label="Redirection URL" />
                <TextInputField name="Meta_Title" label="Meta Title" />
                <TextInputField name="Meta_Description" label="Meta Description" />
              </div>
            </div>

          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="mt-4 dashboard_primary_button not-[]:cursor-pointer"
              disabled={loading || updating}
            >
              {loading || updating
                ? 'Submitting...'
                : editblog?.id
                  ? 'Update Blog'
                  : 'Submit Blog'}
            </button>
          </div>

        </Form>
      )}
    </Formik>
  );
};

export default AddBlogs;
