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

const TextInputField = ({ name, label }: { name: string; label: string }) => (
  <div>
    <label className="font-semibold">{label}</label>
    <Field name={name} className="primary-input" />
    <ErrorMessage name={name} component="div" className="text-red-500 text-sm" />
  </div>
);

interface AddBlogProps {
  setselecteMenu: React.Dispatch<React.SetStateAction<string>>;
  editblog?:IBlog;
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

const AddBlogs = ({ setselecteMenu,editblog,subCategories}: AddBlogProps) => {
  const [posterImage, setposterImage] = useState<ProductImage[]>();
  const [createBlogMutation, { loading }] = useMutation(CREATE_BLOG);
  const [updateBlogMutation, { loading: updating }] = useMutation(UPDATE_BLOG);
 const session = useSession()
  const finalToken = session.data?.accessToken
  const [blog, setblog] = useState<IBlog>({
  title: editblog?.title || '',
  content: editblog?.content || '',
  custom_url: editblog?.custom_url || '',
  category:editblog?.category || '',
  status: editblog?.status || 'DRAFT',
  isPublished: editblog?.isPublished || false,
  posterImage: editblog?.posterImage || undefined,
  last_editedBy: editblog?.last_editedBy || '',
  Canonical_Tag: editblog?.Canonical_Tag || '',
  Meta_Description: editblog?.Meta_Description || '',
  Meta_Title: editblog?.Meta_Title || '',
  redirectionUrl:editblog?.redirectionUrl ||'',
})


useEffect(() => {
  setblog({
    title: editblog?.title || '',
    content: editblog?.content || '',
    category: editblog?.category || '',
    status: editblog?.status || 'DRAFT',
    isPublished: editblog?.isPublished || false,
    posterImage: editblog?.posterImage || undefined,
    last_editedBy: editblog?.last_editedBy || '',
    Canonical_Tag: editblog?.Canonical_Tag || '',
    Meta_Description: editblog?.Meta_Description || '',
    Meta_Title: editblog?.Meta_Title || '',
    redirectionUrl: editblog?.redirectionUrl || '',
    custom_url: editblog?.custom_url || '',
  });

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


  return (
    <Formik
        enableReinitialize
        initialValues={blog}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
    >
        {() => (
          <Form>
            <div className='flex flex-wrap mb-5 gap-2 justify-between items-center'>
              <p
              className="dashboard_primary_button"
               onClick={() => setselecteMenu('All Blogs')}
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
            
          <div className='space-y-4 max-w-3xl mx-auto'>
              <div className="rounded-sm border bg-primary border-stroke">
              <div className="border-b bg-primary border-stroke py-4 px-2 hover:bg-black">
                <h3 className="font-medium text-white">Add Poster Image</h3>
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
                        className=" w-ful border px-2 py-1 text-sm text-black h-10 mt-2 w-full p-2"
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
                <ImageUploader setposterimageUrl={setposterImage} />
              )}
              </div>
            <TextInputField name="title" label="Title" />

            <div>
              <label className="font-semibold">Content</label>
              <TinyMCEEditor name="content" />
              <ErrorMessage name="content" component="div" className="text-red-500 text-sm" />
            </div>
            <div>
              <label className="mb-3 block py-4 px-2 text-sm font-medium  ">
                Select Category
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

                  {subCategories.map((category) => (
                    <option className="bg-primary" key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </Field>

              </div>
              <ErrorMessage name="category" component="div" className="text-red-500 " />
            </div>
            <TextInputField name="custom_url" label="custom_url" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <TextInputField name="Canonical_Tag" label="Canonical Tag" />
              <TextInputField name="redirectionUrl" label="Redirection URL" />
              <TextInputField name="Meta_Title" label="Meta Title" />
              <TextInputField name="Meta_Description" label="Meta Description" />
            </div>
            <Field name="status">
              {({ field, form }: import('formik').FieldProps) => (
                <div className="flex gap-4 items-center my-4">
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
            className="dashboard_primary_button rounded"
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
