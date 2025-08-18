'use client';
import React, { useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useMutation } from '@apollo/client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Admin } from 'types/type';
import showToast from 'components/Toaster/Toaster';
import revalidateTag from 'components/ServerActons/ServerAction';
import { CREATE_ADMIN, UPDATE_ADMIN } from 'graphql/Admins';
import { useSession } from 'next-auth/react';
import { Modal } from 'antd';
import { initialAdminValues } from 'data/InitialValues';
import { checkboxAdminData } from 'data/data';
import { validationAdminSchema } from 'data/Validations';
import { adminCheckBox, CreateAdminProps } from 'types/admin';



const CreateAdmin: React.FC<CreateAdminProps> = ({
  setselecteMenu,
  EditAdminValue,
  EditInitialValues,
  setEditProduct,
}) => {
  const updateFlag = EditAdminValue && EditInitialValues ? true : false;
  const initialFormValues: Admin = updateFlag && EditAdminValue ? EditAdminValue : initialAdminValues;
  const session = useSession()
  const finalToken = session.data?.accessToken

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [createAdmin] = useMutation(CREATE_ADMIN);
  const [updateAdmin] = useMutation(UPDATE_ADMIN);


  const handleBack = (values: Admin) => {
    const isFormChanged = JSON.stringify(initialFormValues) !== JSON.stringify(values);
    if (isFormChanged) {
      Modal.confirm({
        title: "Unsaved Changes",
        content: "You have unsaved changes. Do you want to discard them?",
        okText: "Discard Changes",
        cancelText: "Cancel",
        onOk: () => {
          setselecteMenu('AllAdmin');
          setEditProduct(undefined);
        },
      });
      return;
    }
    setselecteMenu('AllAdmin');
    setEditProduct(undefined);
    return;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationAdminSchema}
        onSubmit={async (values: Admin, { setSubmitting }) => {
          try {
            setLoading(true);
            const input = updateFlag ? { id: EditInitialValues?.id, ...values } : values;
            if (updateFlag) {
              await updateAdmin({
                variables: { input }, context: {
                  headers: {
                    authorization: `Bearer ${finalToken}`,
                  },
                },
              });
            } else {
              await createAdmin({
                variables: { input }, context: {
                  headers: {
                    authorization: `Bearer ${finalToken}`,
                  },
                },
              });
            }


            setSubmitting(false);
            setselecteMenu('AllAdmin');
            setEditProduct(undefined);
            showToast('success', `Admin ${updateFlag ? 'updated' : 'created'} successfully`);
            revalidateTag('Admins')

          }

          //eslint-disable-next-line
          catch (err: any) {
            setError(err?.message || 'An unexpected error occurred.');
            alert(err?.message || 'An error occurred');
          } finally {
            setLoading(false);
          }
        }}
      >
        {({ handleSubmit, values, setValues }) => (
          <>
            <button
              className="dashboard_primary_button mb-4"
              onClick={() => handleBack(values)}
            >
              <IoMdArrowRoundBack /> Back
            </button>
            <Form onSubmit={handleSubmit} className="bg-white dark:bg-black/50 backdrop-blur-3xl p-6 rounded-lg shadow-lg">
              <h2 className="text-2xl text-center font-bold mb-6 text-black dark:text-white">{updateFlag ? 'Edit Admin' : 'Create New Admin'}</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="fullname" className="block text-sm font-medium text-black dark:text-white mb-1">
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
                  <label htmlFor="email" className="block text-sm font-medium text-black dark:text-white mb-1">
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
                <label htmlFor="password" className="block text-sm font-medium text-black dark:text-white mb-1">
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
                    checkboxAdminData.forEach((checkbox) => {
                      clearedPermissions[checkbox.name as keyof adminCheckBox] = false;
                    });
                    setValues({ ...values, ...(clearedPermissions) });
                  }}
                  className="dashboard_primary_button"
                >
                  Clear All
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const allPermissions: Partial<Record<keyof adminCheckBox, boolean>> = {};
                    checkboxAdminData.forEach((checkbox) => {
                      allPermissions[checkbox.name as keyof adminCheckBox] = true;
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
                className={`w-full flex justify-center dashboard_primary_button ${loading ? ' cursor-not-allowed' : "cursor-pointer"
                  }`}
              >
                {loading ? 'Loading...' : updateFlag ? 'Update Admin' : 'Add Admin'}
              </button>

              {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default CreateAdmin;