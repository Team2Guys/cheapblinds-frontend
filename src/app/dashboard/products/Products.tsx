"use client";
import Breadcrumb from "@components/Dashboard/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@components/Dashboard/DefaultLayout";
import ViewProduct from "@components/Dashboard/dashboard_products/ViewProduct";
import AddProd from "@components/Dashboard/dashboard_products/AddProd";
import { Category, Product, Subcategory } from "@/types/category";

import { useState } from "react";

export interface ProductPageProps {
  categoryList: Category[];
  productList?: Product[];
  subCategoryList?:Subcategory[]
}

const ProductPage = ({ categoryList, productList, subCategoryList }: ProductPageProps) => {
  const [selectMenu, setSelecteMenu] = useState<string>("View Products");
  const [editProduct, setEditProduct] = useState<Product | null>();

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Products" />
      {selectMenu === "View Products" ? (
        <ViewProduct productList={productList || []} setSelecteMenu={setSelecteMenu} setEditProduct={setEditProduct} />
      ) : (
        <AddProd setSelecteMenu={setSelecteMenu} categoryList={categoryList} subCategoryList={subCategoryList} editProduct={editProduct} />
      )}
    </DefaultLayout>
  );
};

export default ProductPage;
