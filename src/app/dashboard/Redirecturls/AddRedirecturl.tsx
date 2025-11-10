"use client";
import React, { SetStateAction, useEffect, useRef, useState } from "react";
import { initialRedirectUrls, RedirectUrls } from "@/types/general";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { useMutation } from "@apollo/client";
import { ADD_REDIRECTURLS, UPDATE_REDIRECTURLS } from "@graphql/mutations";
import { IoMdArrowRoundBack } from "react-icons/io";
import revalidateTag from "@components/ServerActons/ServerAction";
import { useSession } from "next-auth/react";
import { initialRedirctUlrsValues } from "@data/InitialValues";
import { validationRedirctUlrsSchema } from "@data/Validations";
import { Toaster} from "@components";
import { ConfirmToast } from "@components/common/ConfirmToast";

interface IVIEWREDIRECTURLS {
  setRedirectUrls: React.Dispatch<SetStateAction<RedirectUrls | undefined>>;
  setselecteMenu: React.Dispatch<SetStateAction<string>>;
  RedirectUrls: RedirectUrls | undefined;
}

function AddRedirecturl({ RedirectUrls, setRedirectUrls, setselecteMenu }: IVIEWREDIRECTURLS) {
  const [AddredirectUrls, { loading }] = useMutation(ADD_REDIRECTURLS);

  const [updateReviewMutation, { loading: updateloading }] = useMutation(UPDATE_REDIRECTURLS);
  const [formDate, setformDate] = useState<initialRedirectUrls>(
    RedirectUrls ? RedirectUrls : initialRedirctUlrsValues,
  );
  const session = useSession();
  const finalToken = session.data?.accessToken;
  const formikValuesRef = useRef<initialRedirectUrls>(formDate);
  useEffect(() => {
    setformDate(RedirectUrls ? RedirectUrls : initialRedirctUlrsValues);
  }, [RedirectUrls]);

  const apiHandler = async (values: initialRedirectUrls) => {
    try {
      if (RedirectUrls?.redirectedUrl) {
        // UPDATE existing review
        await updateReviewMutation({
          context: {
            headers: {
              authorization: `Bearer ${finalToken}`,
            },
            credentials: "include",
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
            credentials: "include",
          },
          variables: {
            CreatedRedirecturls: values,
          },
        });
      }

      setRedirectUrls(undefined);
      setselecteMenu("All Reviews");
      revalidateTag("RedirectUrls");
      // eslint-disable-next-line
    } catch (error: any) {
      const graphQLError = error?.graphQLErrors?.[0]?.message;
      Toaster("error", graphQLError || "Internal server error");
    }
  };

  const handleSubmit = async (
    values: initialRedirectUrls,
    { resetForm }: FormikHelpers<initialRedirectUrls>,
  ) => {
    await apiHandler(values);
    resetForm();
  };

  const hasUnsavedChanges = (): boolean => {
    const initialFormValues = formDate;
    const isFormChanged =
      JSON.stringify(initialFormValues) !== JSON.stringify(formikValuesRef.current);

    return isFormChanged;
  };

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges()) {
        e.preventDefault();
        e.returnValue = "";
        return "";
      }
    };

    const handlePopState = () => {
      if (hasUnsavedChanges()) {
        window.history.pushState(null, "", window.location.href);

        ConfirmToast({
          onConfirm: () => {
            setselecteMenu("All Reviews");
          },
          onCancel: () => {
            // Do nothing, just stay on the same page
          },
        });
      } else {
        setselecteMenu("All Reviews");
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);
    window.history.pushState(null, "", window.location.href);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [formDate]);

  const handleBack = () => {
    if (hasUnsavedChanges()) {
      ConfirmToast({
        onConfirm: () => {
          setselecteMenu("All Reviews");
        },
        onCancel: () => {
          // User canceled, stay on the same page
        },
      });
      return;
    }

    setselecteMenu("All Reviews");
  };

  return (
    <Formik
      enableReinitialize
      initialValues={formDate}
      validationSchema={validationRedirctUlrsSchema}
      onSubmit={handleSubmit}
    >
      {({ values }) => {
        formikValuesRef.current = values;
        return (
          <>
            <p className="dashboard_primary_button mb-4" onClick={handleBack}>
              <IoMdArrowRoundBack /> Back
            </p>

            <Form className="space-y-4 max-w-2xl mx-auto bg-white dark:bg-black/50 backdrop-blur-3xl rounded-sm border p-4 xs:p-6">
              <div>
                <label htmlFor="name" className="primary-label">
                  Url Endpoint{" "}
                </label>
                <Field name="url" type="text" className="primary-input" placeholder="Url" />
                <ErrorMessage name="url" component="div" className="text-red-500 text-sm" />
              </div>

              <div>
                <label htmlFor="redirectedUrl" className="primary-label">
                  Redirect Pages
                </label>
                <Field
                  name="redirectedUrl"
                  type="text"
                  className="primary-input"
                  placeholder="redirected Url"
                />
                <ErrorMessage
                  name="redirectedUrl"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading || updateloading}
                className="dashboard_primary_button"
              >
                {loading || updateloading ? "Submitting" : "Submit"}
              </button>
            </Form>
          </>
        );
      }}
    </Formik>
  );
}

export default AddRedirecturl;
