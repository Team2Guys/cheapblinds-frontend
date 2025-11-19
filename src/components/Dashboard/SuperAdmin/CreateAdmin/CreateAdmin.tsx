"use client";

import React from "react";
import { Formik, Form } from "formik";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Input, Toaster } from "@components";
import { Admin, CreateAdminProps } from "@/types/admin";
import { PermissionOptions } from "@data/admin";
import { useMutation } from "@apollo/client";
import { SIGN_UP, UPDATE_ADMIN_BY_ID } from "@graphql";
import revalidateTag from "@components/ServerActons/ServerAction";

const CreateAdmin = ({ setSelecteMenu, editAdmin }: CreateAdminProps) => {
  const handleBack = () => setSelecteMenu("AllAdmin");

  const [createAdmin] = useMutation(SIGN_UP);
  const [updateAdmin] = useMutation(UPDATE_ADMIN_BY_ID);

  const handleSubmit = async (values: Admin) => {
    try {
      if (editAdmin) {
        const result = await updateAdmin({
          variables: {
            input: {
              id: editAdmin.id,
              firstName: values.firstName,
              lastName: values.lastName,
              email: values.email,
              role: "ADMIN",
              permissions: values.permissions,
            },
          },
        });

        if (result.data?.updateAdminById?.status) {
          Toaster("success", "Admin updated successfully!");
          revalidateTag("Admins");
          setSelecteMenu("AllAdmin");
        } else {
          Toaster("error", result.data?.updateAdminById?.message);
        }
      } else {
        const result = await createAdmin({
          variables: { input: values },
        });

        if (result.data?.signup?.status === "success") {
          Toaster("success", "Admin created successfully!");
          setSelecteMenu("AllAdmin");
        } else {
          Toaster("error", result.data?.signup?.message);
        }
      }
    } catch (error) {
      console.log(error);
      Toaster("error", "Something went wrong!");
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <button className="dashboard_primary_button mb-4" onClick={handleBack}>
        <IoMdArrowRoundBack /> Back
      </button>

      <Formik
        enableReinitialize
        initialValues={{
          firstName: editAdmin?.firstName || "",
          lastName: editAdmin?.lastName || "",
          email: editAdmin?.email || "",
          password: "",
          role: "ADMIN",
          permissions: editAdmin?.permissions || [],
        }}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="bg-white p-6 rounded-lg shadow-lg space-y-4">
            <h2 className="text-2xl font-bold text-center">
              {editAdmin ? "Edit Admin" : "Create Admin"}
            </h2>

            <Input label="First Name" name="firstName" />
            <Input label="Last Name" name="lastName" />
            <Input label="Email" name="email" type="email" />

            {/* Hide password in edit mode */}
            {!editAdmin && <Input label="Password" name="password" type="password" />}

            {/* Permissions */}
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
                        if (values.permissions.includes(permission.value)) {
                          setFieldValue(
                            "permissions",
                            values.permissions.filter((p) => p !== permission.value),
                          );
                        } else {
                          setFieldValue("permissions", [...values.permissions, permission.value]);
                        }
                      }}
                      className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                    />
                    <span className="text-sm font-medium">{permission.display}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center dashboard_primary_button mt-6"
            >
              {editAdmin ? "Update Admin" : "Add Admin"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateAdmin;
