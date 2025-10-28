"use client";
import Breadcrumb from "components/Dashboard/Breadcrumbs/Breadcrumb";
import DefaultLayout from "components/Dashboard/DefaultLayout";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Admin, AdminValues } from "types/type";
const Alladmins = dynamic(() => import("components/Dashboard/SuperAdmin/AllAdmin/Alladmins"));
const CreateAdmin = dynamic(
  () => import("components/Dashboard/SuperAdmin/CreateAdmin/CreateAdmin"),
);

const Admins = ({ admins }: { admins: Admin[] }) => {
  const [editAdmin, setEditAdmin] = useState<AdminValues | undefined>();
  const [selecteMenu, setselecteMenu] = useState<string | null | undefined>("AllAdmin");

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Super Admin" />
      <div className="mt-10">
        {selecteMenu == "AllAdmin" ? (
          <Alladmins
            setselecteMenu={setselecteMenu}
            setEditAdmin={setEditAdmin}
            AllAdmins={admins}
          />
        ) : (
          <CreateAdmin
            setselecteMenu={setselecteMenu}
            EditInitialValues={editAdmin}
            setEditProduct={setEditAdmin}
            EditAdminValue={
              editAdmin && (editAdmin.fullname !== undefined || editAdmin.email !== undefined)
                ? editAdmin
                : undefined
            }
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default Admins;
