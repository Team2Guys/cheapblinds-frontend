"use client";

import React from "react";
import { Formik, Form } from "formik";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Input, Toaster } from "@components";
import { CreateAdminProps } from "@/types/admin";
import { PermissionOptions } from "@data/admin";
import { useMutation } from "@apollo/client";
import { CREATE_ADMIN } from "@graphql/Admins";
import { useAuth } from "@context/UserContext";

const CreateAdmin = ({ setselecteMenu }: CreateAdminProps) => {
  const handleBack = () => setselecteMenu("AllAdmin");
  const { admin } = useAuth();
  const [createAdmin, { loading, error }] = useMutation(CREATE_ADMIN, {
    context: {
      headers: {
        authorization: admin?.accessToken,
      },
    },
  });

  const handleSubmit = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    permissions: string[];
  }) => {
    try {
      const result = await createAdmin({
        variables: { input: values },
      });
      if (result.data?.createAdmin?.status) {
        Toaster( "success","Admin created successfully!");
        setselecteMenu("AllAdmin"); 
      } else {
        Toaster("error",result.data?.createAdmin?.message);
      }
    } catch (err) {
      Toaster("error", "There was an error creating the admin.");
      console.error("Error creating admin:", err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button className="dashboard_primary_button mb-4" onClick={handleBack}>
        <IoMdArrowRoundBack /> Back
      </button>

      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          permissions: [] as string[],
        }}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-2xl font-bold text-center">Create Admin</h2>

            <Input label="First Name" name="firstName" />
            <Input label="Last Name" name="lastName" />
            <Input label="Email" name="email" type="email" />
            <Input label="Password" name="password" type="password" />

            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">Permissions</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto p-2">
                {PermissionOptions.map((permission) => (
                  <label
                    key={permission.value}
                    className="flex items-center gap-3 p-2 border rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={values.permissions.includes(permission.value)}
                      onChange={() => {
                        const currentPermissions = values.permissions;
                        if (currentPermissions.includes(permission.value)) {
                          setFieldValue(
                            "permissions",
                            currentPermissions.filter((p) => p !== permission.value),
                          );
                        } else {
                          setFieldValue("permissions", [...currentPermissions, permission.value]);
                        }
                      }}
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium">{permission.display}</span>
                  </label>
                ))}
              </div>

              {values.permissions.length > 0 && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-primary">Selected Permissions:</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {values.permissions.map((permissionValue) => {
                      const permission = PermissionOptions.find((p) => p.value === permissionValue);
                      return (
                        <span
                          key={permissionValue}
                          className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                        >
                          {permission ? permission.display : permissionValue}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm">
                  Error: {error.message}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center dashboard_primary_button mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Creating Admin..." : "Add Admin"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateAdmin;