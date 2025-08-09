import { gql } from "@apollo/client";

export const ADMIN_LOGIN = gql`
  mutation AdminLogin($email: String!, $password: String!) {
    adminLogin(AdminLogin: { email: $email, password: $password }) {
      id
      fullname
      email
      canAddProduct
      canEditProduct
      canDeleteProduct
      canAddCategory
      canDeleteCategory
      canEditCategory
      canCheckProfit
      canCheckRevenue
      canCheckVisitors
      canViewUsers
      canViewSales
      canVeiwAdmins
      canVeiwTotalproducts
      canVeiwTotalCategories
      posterImageUrl
      role
      token
    }
  }
`;
export const super_admin_ADMIN_LOGIN = gql`
  mutation superAdminLogin($email: String!, $password: String!) {
    superAdminLogin(superAdminLogin: { email: $email, password: $password }) {
      id
      fullname
      email
      canAddProduct
      canEditProduct
      canDeleteProduct
      canAddCategory
      canDeleteCategory
      canEditCategory
      canCheckProfit
      canCheckRevenue
      canCheckVisitors
      canViewUsers
      canViewSales
      canVeiwAdmins
      canVeiwTotalproducts
      canVeiwTotalCategories
      posterImageUrl
      role
      token
    }
  }
`;


export const CREATE_ADMIN = gql`
  mutation CreateAdmin($input: CreateAdminInput!) {
    createAdmin(createAdminInput: $input) {
      id
      fullname
      email
      role
      canAddProduct
      canEditProduct
      canDeleteProduct
      canAddCategory
      canDeleteCategory
      canEditCategory
      canCheckProfit
      canCheckRevenue
      canCheckVisitors
      canViewUsers
      canViewSales
      canVeiwAdmins
      canVeiwTotalproducts
      canVeiwTotalCategories
      posterImageUrl
    }
      
  }
`;



export const UPDATE_ADMIN = gql`
  mutation UpdateAdmin($input: UpdateAdminInput!) {
    updateAdmin(updateAdminInput: $input) {
      id
      fullname
      email
      role
      canAddProduct
      canEditProduct
      canDeleteProduct
      canAddCategory
      canDeleteCategory
      canEditCategory
      canCheckProfit
      canCheckRevenue
      canCheckVisitors
      canViewUsers
      canViewSales
      canVeiwAdmins
      canVeiwTotalproducts
      canVeiwTotalCategories
      posterImageUrl
    }
  }
`;
