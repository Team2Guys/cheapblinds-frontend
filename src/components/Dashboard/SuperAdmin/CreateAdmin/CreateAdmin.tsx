'use client';
import React, { SetStateAction, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';
import { useMutation } from '@apollo/client';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Admin, AdminValues } from 'types/type';
import showToast from 'components/Toaster/Toaster';
import revalidateTag from 'components/ServerActons/ServerAction';
import { CREATE_ADMIN, UPDATE_ADMIN } from 'graphql/Admins';
import { useSession } from 'next-auth/react';
import { Modal } from 'antd';

interface CheckBox {
  canAddProduct: boolean;
  canEditProduct: boolean;
  canDeleteProduct: boolean;
  canAddCategory: boolean;
  canDeleteCategory: boolean;
  canEditCategory: boolean;
  canAddSubCategory: boolean,
  canDeleteSubCategory: boolean,
  canEditSubCategory: boolean,
  canVeiwTotalSubCategories: boolean,
  canCheckProfit: boolean;
  canCheckRevenue: boolean;
  canCheckVisitors: boolean;
  canViewUsers: boolean;
  canViewSales: boolean;
  canVeiwAdmins: boolean;
  canVeiwTotalproducts: boolean;
  canVeiwTotalCategories: boolean;
  canAddBlog: boolean,
  canDeleteBlog: boolean,
  canEditBlog: boolean,
  canVeiwTotalBlog: boolean,
  canAddRedirecturls: boolean,
  canDeleteRedirecturls: boolean,
  canEditRedirecturls: boolean,
  canVeiwTotalRedirecturls: boolean,
}

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required('Full Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string().required('Password is required'),
  canAddProduct: Yup.boolean(),
  canEditProduct: Yup.boolean(),
  canDeleteProduct: Yup.boolean(),
  canAddCategory: Yup.boolean(),
  canDeleteCategory: Yup.boolean(),
  canEditCategory: Yup.boolean(),
  canCheckProfit: Yup.boolean(),
  canCheckRevenue: Yup.boolean(),
  canCheckVisitors: Yup.boolean(),
  canViewUsers: Yup.boolean(),
  canViewSales: Yup.boolean(),
  canVeiwAdmins: Yup.boolean(),
  canVeiwTotalproducts: Yup.boolean(),
  canVeiwTotalCategories: Yup.boolean(),
  // canAddSubCategory: Yup.boolean(),
  // canDeleteSubCategory: Yup.boolean(),
  // canEditSubCategory: Yup.boolean(),
  // canVeiwTotalSubCategories: Yup.boolean(),
  // canAddBlog: Yup.boolean(),
  // canDeleteBlog: Yup.boolean(),
  // canEditBlog: Yup.boolean(),
  // canVeiwTotalBlog: Yup.boolean(),
  // canAddRedirecturls: Yup.boolean(),
  // canDeleteRedirecturls: Yup.boolean(),
  // canEditRedirecturls: Yup.boolean(),
  // canVeiwTotalRedirecturls: Yup.boolean(),
});


const initialValues: Admin = {
  fullname: '',
  email: '',
  password: '',
  canAddProduct: false,
  canEditProduct: false,
  canDeleteProduct: false,
  canAddCategory: false,
  canDeleteCategory: false,
  canEditCategory: false,
  canCheckProfit: false,
  canCheckRevenue: false,
  canCheckVisitors: false,
  canViewUsers: false,
  canViewSales: false,
  canVeiwAdmins: false,
  canVeiwTotalproducts: false,
  canVeiwTotalCategories: false,
  // canAddSubCategory: false,
  // canDeleteSubCategory: false,
  // canEditSubCategory: false,
  // canVeiwTotalSubCategories: false,
  // canAddBlog: false,
  // canDeleteBlog: false,
  // canEditBlog: false,
  // canVeiwTotalBlog: false,
  // canAddRedirecturls: false,
  // canDeleteRedirecturls: false,
  // canEditRedirecturls: false,
  // canVeiwTotalRedirecturls: false,
};

interface CreateAdminProps {
  setselecteMenu: React.Dispatch<SetStateAction<string | null | undefined>>
  EditAdminValue?: Admin | undefined;
  EditInitialValues?: AdminValues | undefined;
  setEditProduct: React.Dispatch<SetStateAction<Admin | undefined>>
}

const CreateAdmin: React.FC<CreateAdminProps> = ({
  setselecteMenu,
  EditAdminValue,
  EditInitialValues,
  setEditProduct,
}) => {
  const updateFlag = EditAdminValue && EditInitialValues ? true : false;
  const initialFormValues: Admin = updateFlag && EditAdminValue ? EditAdminValue : initialValues;
  const session = useSession()
  const finalToken = session.data?.accessToken

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [createAdmin] = useMutation(CREATE_ADMIN);
  const [updateAdmin] = useMutation(UPDATE_ADMIN);
  const checkboxData = [
    { name: 'canAddProduct', label: 'Can Add Product' },
    { name: 'canEditProduct', label: 'Can Edit Product' },
    { name: 'canDeleteProduct', label: 'Can Delete Product' },
    { name: 'canAddCategory', label: 'Can Add Category' },
    { name: 'canDeleteCategory', label: 'Can Delete Category' },
    { name: 'canEditCategory', label: 'Can Edit Category' },
    { name: 'canCheckProfit', label: 'Can Check Profit' },
    { name: 'canCheckRevenue', label: 'Can Check Revenue' },
    { name: 'canCheckVisitors', label: 'Can Check Visitors' },
    { name: 'canViewUsers', label: 'Can View Users' },
    { name: 'canViewSales', label: 'Can View Sales' },
    { name: 'canVeiwAdmins', label: 'Can View Admins' },
    { name: 'canVeiwTotalCategories', label: 'Can View Categories' },
    { name: 'canVeiwTotalproducts', label: 'Can View Products' },
    // { name: 'canVeiwTotalRedirecturls', label: 'Can View Redirecturls' },
    // { name: 'canEditRedirecturls', label: 'Can Edit Redirecturls' },
    // { name: 'canDeleteRedirecturls', label: 'Can Delete Redirecturls' },
    // { name: 'canAddRedirecturls', label: 'Can Add Redirecturls' },
    // { name: 'canVeiwTotalBlog', label: 'Can view Blogs' },
    // { name: 'canDeleteBlog', label: 'Can Delete Blogs' },
    // { name: 'canEditBlog', label: 'Can Edit Blogs' },
    // { name: 'canAddBlog', label: 'Can Add Blogs' },
    // { name: 'canAddSubCategory', label: 'Can Add Sub Category' },
    // { name: 'canDeleteSubCategory', label: 'Can Delete Sub Category' },
    // { name: 'canEditSubCategory', label: 'Can Edit Sub Category' },
    // { name: 'canVeiwTotalSubCategories', label: 'Can View Sub Categories' },
  ];

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
        validationSchema={validationSchema}
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
                {checkboxData.map((checkbox) => (
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
                    const clearedPermissions: Partial<Record<keyof CheckBox, boolean>> = {};
                    checkboxData.forEach((checkbox) => {
                      clearedPermissions[checkbox.name as keyof CheckBox] = false;
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
                    const allPermissions: Partial<Record<keyof CheckBox, boolean>> = {};
                    checkboxData.forEach((checkbox) => {
                      allPermissions[checkbox.name as keyof CheckBox] = true;
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