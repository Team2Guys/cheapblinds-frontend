'use client';
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/DefaultLayout';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { Admin, AdminValues } from 'types/type';
const Alladmins = dynamic(() => import("components/Dashboard/SuperAdmin/AllAdmin/Alladmins"))
const CreateAdmin = dynamic(() => import("components/Dashboard/SuperAdmin/CreateAdmin/CreateAdmin"))

const Admins = ({ admins }: { admins: Admin[] }) => {

  const [editAdmin, setEditAdmin] = useState<AdminValues | undefined>();
  const [selecteMenu, setselecteMenu] = useState<string | null | undefined>('AllAdmin');


  const EditInitialValues: AdminValues = {
    id: editAdmin?.id,
    fullname: editAdmin?.fullname,
    email: editAdmin?.email,
    password: editAdmin?.password,
    canCheckVisitors: editAdmin?.canCheckVisitors,
    canCheckProfit: editAdmin?.canCheckProfit,
    canCheckRevenue: editAdmin?.canCheckRevenue,
    canAddCategory: editAdmin?.canAddCategory,
    canDeleteCategory: editAdmin?.canDeleteCategory,
    canEditCategory: editAdmin?.canEditCategory,
    canVeiwTotalCategories: editAdmin?.canVeiwTotalSubCategories,
    // canAddSubCategory: editAdmin?.canAddSubCategory,
    // canDeleteSubCategory: editAdmin?.canDeleteSubCategory,
    // canEditSubCategory: editAdmin?.canEditSubCategory,
    // canVeiwTotalSubCategories: editAdmin?.canVeiwTotalSubCategories,
    canAddProduct: editAdmin?.canAddProduct,
    canDeleteProduct: editAdmin?.canDeleteProduct,
    canEditProduct: editAdmin?.canEditProduct,
    canVeiwTotalproducts: editAdmin?.canVeiwTotalproducts,
    canVeiwAdmins: editAdmin?.canVeiwAdmins,
    canViewSales: editAdmin?.canViewSales,
    canViewUsers: editAdmin?.canViewUsers,
    // canAddBlog:  editAdmin?.canAddBlog,
    // canDeleteBlog:  editAdmin?.canDeleteBlog,
    // canEditBlog:  editAdmin?.canEditBlog,
    // canVeiwTotalBlog:  editAdmin?.canVeiwTotalBlog,
    // canAddRedirecturls:  editAdmin?.canAddRedirecturls,
    // canDeleteRedirecturls:  editAdmin?.canDeleteRedirecturls,
    // canEditRedirecturls:  editAdmin?.canEditRedirecturls,
    // canVeiwTotalRedirecturls:  editAdmin?.canVeiwTotalRedirecturls,
  };

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Super Admin" />
      <div className="mt-10">
        {selecteMenu == 'AllAdmin' ? (
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
            EditAdminValue={EditInitialValues && (EditInitialValues.fullname !== undefined ||
              EditInitialValues.email !== undefined)
              ? EditInitialValues
              : undefined
            }
          />
        )}
      </div>
    </DefaultLayout>
  );
};

export default Admins;
