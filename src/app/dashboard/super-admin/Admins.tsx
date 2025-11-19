"use client";
import Breadcrumb from "@components/Dashboard/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@components/Dashboard/DefaultLayout";
import AllAdmins from "@components/Dashboard/SuperAdmin/AllAdmin/Alladmins";
import React, { useState } from "react";
import CreateAdmin from "@components/Dashboard/SuperAdmin/CreateAdmin/CreateAdmin";
import { Admin } from "@/types/admin";

const Admins = ({ admins }: { admins: Admin[] }) => {
  const [selectMenu, setSelecteMenu] = useState<string>("AllAdmin");
  const [editAdmin, setEditAdmin] = useState<Admin | null>(null);
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Super Admin" />
      <div className="mt-10">
        {selectMenu == "AllAdmin" ? (
          <AllAdmins
            setSelecteMenu={setSelecteMenu}
            setEditAdmin={setEditAdmin}
            AllAdminData={admins || []}
          />
        ) : (
          <CreateAdmin setSelecteMenu={setSelecteMenu} editAdmin={editAdmin} />
        )}
      </div>
    </DefaultLayout>
  );
};

export default Admins;
