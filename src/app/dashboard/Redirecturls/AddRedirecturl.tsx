"use client"
import React, { SetStateAction, useEffect, useState } from 'react'
import { initialRedirectUrls, RedirectUrls } from 'types/general'
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';;
import { useMutation } from '@apollo/client';
import { ADD_REDIRECTURLS, UPDATE_REDIRECTURLS } from 'graphql/mutations';
import { IoMdArrowRoundBack } from 'react-icons/io';
import revalidateTag from 'components/ServerActons/ServerAction';
import showToast from 'components/Toaster/Toaster';
import { useSession } from 'next-auth/react';



interface IVIEWREDIRECTURLS {
  setRedirectUrls: React.Dispatch<SetStateAction<RedirectUrls | undefined>>
  setselecteMenu: React.Dispatch<SetStateAction<string>>,
  RedirectUrls: RedirectUrls | undefined
}


function AddRedirecturl({ RedirectUrls, setRedirectUrls, setselecteMenu }: IVIEWREDIRECTURLS) {
  const [AddredirectUrls, { loading }] = useMutation(ADD_REDIRECTURLS)

  const [updateReviewMutation, { loading: updateloading }] = useMutation(UPDATE_REDIRECTURLS);
  const [formDate, setformDate] = useState<initialRedirectUrls>({
    redirectedUrl: RedirectUrls?.redirectedUrl,
    url: RedirectUrls?.url,
  })
const session = useSession()
  const finalToken = session.data?.accessToken

  useEffect(() => {

    setformDate({
      url: RedirectUrls?.url,
      redirectedUrl: RedirectUrls?.redirectedUrl,

    })
  }, [RedirectUrls])


  const validationSchema = Yup.object({
    url: Yup.string().required('Url is required'),
    redirectedUrl: Yup.string().required('redirectedUrl is required'),
  });

  const apiHandler = async (values: initialRedirectUrls) => {
    try {
      if (RedirectUrls?.redirectedUrl) {
        // UPDATE existing review
        await updateReviewMutation({
          context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
            credentials: 'include',
          },
          variables: {
            UpdateRedirecturls: {
              id: RedirectUrls.id,
              ...values,
            },
          },
        });
      } else {
        // ADD new review
        await AddredirectUrls({
          context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
            credentials: 'include',
          },
          variables: {
            CreatedRedirecturls: values,
          },
        });
      }

      setRedirectUrls(undefined);
      setselecteMenu('All Reviews')
      revalidateTag("RedirectUrls")
      // eslint-disable-next-line
    } catch (error:any) {
  const graphQLError = error?.graphQLErrors?.[0]?.message;
  showToast('error', graphQLError || "Internal server error")
    }

    
  };



  const handleSubmit = async (values: initialRedirectUrls, { resetForm }: FormikHelpers<initialRedirectUrls>) => {
    await apiHandler(values)
    resetForm()

  };

  return (
    <>
      <p
        className="text-lg font-black mb-4 flex items-center justify-center gap-2 hover:bg-parimary bg-black rounded-sm w-fit p-2 cursor-pointer text-white"
        onClick={() => {
          setselecteMenu('All Reviews');
        }}
      >
        <IoMdArrowRoundBack /> Back
      </p>

      <Formik enableReinitialize initialValues={formDate}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (


          <Form className="space-y-4 max-w-2xl mx-auto">

            <div>
              <label htmlFor="name">Url Endpoint </label>
              <Field name="url" type="text" className="primary-input" />
              <ErrorMessage name="url" component="div" className="text-red-500 text-sm" />
            </div>

            <div>
              <label htmlFor="redirectedUrl">Redirect Pages</label>
              <Field name="redirectedUrl" type="text" className="primary-input" />
              <ErrorMessage name="redirectedUrl" component="div" className="text-red-500 text-sm" />
            </div>



            <button type="submit" disabled={loading || updateloading} className="dashboard_primary_button">
              {(loading || updateloading) ? "Submitting" : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
    </>

  )
}

export default AddRedirecturl

