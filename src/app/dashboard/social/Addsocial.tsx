"use client"
import React, { SetStateAction, useEffect, useState } from 'react'
import { initialSocial, initiValuesProps, ISOCIAL_LINKS } from 'types/general'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { ProductImage } from 'types/prod';
import ImageUploader from 'components/ImageUploader/ImageUploader';
import { handleImageAltText, ImageRemoveHandler } from 'utils/helperFunctions';
import Image from 'next/image';
import { RxCross2 } from 'react-icons/rx';
import { useMutation } from '@apollo/client';
import { IoMdArrowRoundBack } from 'react-icons/io';
import revalidateTag from 'components/ServerActons/ServerAction';
import { CREATE_SOCIAL, UPDATE_SOCIAL } from 'graphql/Socials';
import showToast from 'components/Toaster/Toaster';
import { useSession } from 'next-auth/react';



interface I_Add_Review {
  setEditsetReview: React.Dispatch<SetStateAction<ISOCIAL_LINKS | undefined>>
  setselecteMenu: React.Dispatch<SetStateAction<string>>,
  editReview: ISOCIAL_LINKS | undefined
}


function Addsocial({ editReview, setEditsetReview, setselecteMenu }: I_Add_Review) {

  const [posterimageUrl, setposterimageUrl] = useState<ProductImage[] | undefined>((editReview && editReview.posterImageUrl) ? [editReview.posterImageUrl] : undefined);
  const [AddReview, { loading }] = useMutation(CREATE_SOCIAL)

  const [updateReviewMutation, { loading: updateloading }] = useMutation(UPDATE_SOCIAL);

  const [formDate, setformDate] = useState<initialSocial>({
    post_links: ""

  })
  const session = useSession()
  const finalToken = session.data?.accessToken


  useEffect(() => {
    setformDate({
      post_links: editReview?.post_links,
    })
  }, [editReview])


  const validationSchema = Yup.object({
    post_links: Yup.string().required('Post link is required'),
  });

  const apiHandler = async (values: initiValuesProps) => {
    try {
      const posterImageUrl = posterimageUrl && posterimageUrl[0];

      const payload = {
        ...values,
        posterImageUrl,
      };

      if (editReview?.post_links) {
        // UPDATE existing reviewl
        await updateReviewMutation({
          context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
            credentials: 'include',
          },
          variables: {
            UpdateGeneralsocial: {
              id: editReview.id,
              ...payload,
            },
          },
        });
      } else {
        // ADD new review
        await AddReview({
          context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
            credentials: 'include',
          },
          variables: {
            CreateGeneralsocial: payload,
          },
        });
      }

      setEditsetReview(undefined);
      setselecteMenu('All Socials')
      revalidateTag("reviews")
    } catch (error) {
      return error;
    }

  };



  const handleSubmit = async (values: initiValuesProps, { resetForm }: FormikHelpers<initiValuesProps>) => {

    try {
      const posterImageUrl = posterimageUrl && posterimageUrl[0];
      if (!posterImageUrl) return alert("post Image is required")
      const payload = {
        ...values,
        posterImageUrl: posterImageUrl
      };
      await apiHandler(payload)
      resetForm()
    } //eslint-disable-next-line
    catch (error: any) {
      const graphQLError = error?.graphQLErrors?.[0]?.message;
      showToast('error', graphQLError || "Internal server error")
    }


  };

  return (
    <>
      <p
        className="text-lg font-black mb-4 flex items-center justify-center gap-2 hover:bg-parimary bg-black rounded-sm w-fit p-2 cursor-pointer text-white"
        onClick={() => {
          setselecteMenu('All Socials');
        }}
      >
        <IoMdArrowRoundBack /> Back
      </p>

      <Formik enableReinitialize initialValues={formDate} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {() => (


          <Form className="space-y-4 max-w-2xl mx-auto">

            <div className="rounded-sm border bg-primary border-stroke">
              <div className="border-b bg-primary border-stroke py-4 px-2 hover:bg-black">
                <h3 className="font-medium  text-white">
                  Add Post Image
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

                              );
                            }}
                          />
                        </div>

                        <Image
                          fill
                          fetchPriority="high"
                          priority
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
            <div>
              <label htmlFor="post_links">Name</label>
              <Field name="post_links" type="text" className="primary-input" />
              <ErrorMessage name="post_links" component="div" className="text-red-500 text-sm" />
            </div>
            <button type="submit" disabled={loading || updateloading} className="dashboard_primary_button ">
              {(loading || updateloading) ? "Submitting" : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </>

  )
}

export default Addsocial


