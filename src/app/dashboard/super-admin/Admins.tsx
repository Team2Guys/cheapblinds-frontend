"use client";
import Breadcrumb from "@components/Dashboard/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@components/Dashboard/DefaultLayout";
import Alladmins from "@components/Dashboard/SuperAdmin/AllAdmin/Alladmins";
import React, { useState } from "react";
import CreateAdmin from "@components/Dashboard/SuperAdmin/CreateAdmin/CreateAdmin";
import { Admin } from "@/types/admin";


const Admins = ({ admins }: { admins: Admin[] }) => {
  const [selecteMenu, setselecteMenu] = useState<string>("AllAdmin");
  console.log(admins,"adminsadmins")
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Super Admin" />
      <div className="mt-10">
        {selecteMenu == "AllAdmin" ? (
          <Alladmins setselecteMenu={setselecteMenu} AllAdminData={admins || []} />
        ) : (
          <CreateAdmin setselecteMenu={setselecteMenu} />
        )}
      </div>
    </DefaultLayout>
  );
};

export default Admins;
