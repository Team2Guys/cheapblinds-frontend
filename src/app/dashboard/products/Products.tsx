"use client";
import Breadcrumb from "components/Dashboard/Breadcrumbs/Breadcrumb";
import DefaultLayout from "components/Dashboard/DefaultLayout";
import ViewProduct from "components/Dashboard/dashboard_products/ViewProduct";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { IProduct } from "types/prod";
import { DASHBOARD_MAINPAGE_PROPS } from "types/PagesProps";
const AddProd = dynamic(() => import("components/Dashboard/dashboard_products/AddProd"));

const Product = ({ categories, productsData }: DASHBOARD_MAINPAGE_PROPS) => {
  const [editProduct, setEditProduct] = useState<IProduct | undefined>(undefined);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [selecteMenu, setselecteMenu] = useState<string>("Add All Products");

  useEffect(() => {
    setProducts(productsData ?? []);
  }, [productsData]);
  const productFlag: boolean = selecteMenu === "Add All Products" ? true : false;

  return (
    <DefaultLayout>
      <Breadcrumb pageName="Products" />
      {productFlag ? (
        <ViewProduct
          products={products}
          setProducts={setProducts}
          setselecteMenu={setselecteMenu}
          setEditProduct={setEditProduct}
        />
      ) : (
        <AddProd
          setselecteMenu={setselecteMenu}
          editProduct={editProduct}
          setEditProduct={setEditProduct}
          EditProductValue={
            editProduct && (editProduct.name !== undefined || editProduct.category !== undefined)
              ? editProduct
              : undefined
          }
          categoriesList={categories}
          products={productsData}
        />
      )}
    </DefaultLayout>
  );
};

export default Product;
