import { Admin } from "./type";

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
  setselecteMenu: React.Dispatch<React.SetStateAction<string>>;
  EditAdminValue?: Admin;
  EditInitialValues?: Admin | null;
  setEditProduct: React.Dispatch<React.SetStateAction<Admin | null>>;
}
