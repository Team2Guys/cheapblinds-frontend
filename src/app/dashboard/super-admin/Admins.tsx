"use client";
import Breadcrumb from "components/Dashboard/Breadcrumbs/Breadcrumb";
import DefaultLayout from "components/Dashboard/DefaultLayout";
import Alladmins from "components/Dashboard/SuperAdmin/AllAdmin/Alladmins";
import dynamic from "next/dynamic";
import React, { useState } from "react";
import { Admin } from "types/type";
const CreateAdmin = dynamic(
  () => import("components/Dashboard/SuperAdmin/CreateAdmin/CreateAdmin"),
);

const Admins = ({ admins }: { admins: Admin[] }) => {
const [editAdmin, setEditAdmin] = useState<Admin | null>(null);
const [selecteMenu, setselecteMenu] = useState<string>("AllAdmin");

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Super Admin" />
      <div className="mt-10">
        {selecteMenu == "AllAdmin" ? (
          <Alladmins
            setselecteMenu={setselecteMenu}
            setEditAdmin={setEditAdmin}
            AllAdminData={admins}
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
