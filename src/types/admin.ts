import { SetStateAction } from "react";
import { Admin, AdminValues } from "./type";

export interface adminCheckBox {
  canAddProduct: boolean;
  canEditProduct: boolean;
  canDeleteProduct: boolean;
  canAddCategory: boolean;
  canDeleteCategory: boolean;
  canEditCategory: boolean;
  canCheckProfit: boolean;
  canCheckRevenue: boolean;
  canCheckVisitors: boolean;
  canViewUsers: boolean;
  canViewSales: boolean;
  canVeiwAdmins: boolean;
  canVeiwTotalproducts: boolean;
  canVeiwTotalCategories: boolean;
  canAddSubCategory: boolean;
  canDeleteSubCategory: boolean;
  canEditSubCategory: boolean;
  canVeiwTotalSubCategories: boolean;
  canAddBlog: boolean;
  canDeleteBlog: boolean;
  canEditBlog: boolean;
  canVeiwTotalBlog: boolean;
  canAddRedirecturls: boolean;
  canDeleteRedirecturls: boolean;
  canEditRedirecturls: boolean;
  canVeiwTotalRedirecturls: boolean;
  canViewAppointments: boolean;
}

export interface CreateAdminProps {
  setselecteMenu: React.Dispatch<SetStateAction<string | null | undefined>>;
  EditAdminValue?: Admin | undefined;
  EditInitialValues?: AdminValues | undefined;
  setEditProduct: React.Dispatch<SetStateAction<Admin | undefined>>;
}
