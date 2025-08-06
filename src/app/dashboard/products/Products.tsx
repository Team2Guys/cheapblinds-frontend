"use client";
import Breadcrumb from "components/Dashboard/Breadcrumbs/Breadcrumb";
import DefaultLayout from "components/Dashboard/DefaultLayout";
import ViewProduct from "components/Dashboard/dashboard_products/ViewProduct";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import {IEcomerece, IProduct } from "types/prod";
import { DASHBOARD_MAINPAGE_PROPS } from "types/PagesProps";
import { usePathname } from "next/navigation";
const AddProd = dynamic(
  () => import("components/Dashboard/dashboard_products/AddProd")
);

const Product = ({ categories, productsData,ecomereceProducts, }: DASHBOARD_MAINPAGE_PROPS) => {
  const [editProduct, setEditProduct] = useState<IProduct| IEcomerece | undefined>();
  const [products, setProducts] = useState<(IProduct | IEcomerece )[]>([]);
  const [selecteMenu, setselecteMenu] = useState<string>("Add All Products");
    const path = usePathname()
const ecomerece = path === "/dashboard/ecomerece/";
  
  // const EditInitialValues:IProductValues = {
  //   id:editProduct?.id,
  //   name: editProduct?.name,
  //   description: editProduct?.description || "",
  //   price: editProduct?.price || 0,
  //   discountPrice: editProduct?.discountPrice,
  //   category: editProduct && editProduct?.categoryId,
  //   subcategory: editProduct && editProduct?.subCategoryId,
  //   Innersubcategory: editProduct && editProduct?.innersubCategoryId,
  //   stock: (editProduct && editProduct.stock) || 0,
  //   productImages: (editProduct && editProduct.productImages) || [],
  //   Meta_Title: (editProduct && editProduct?.Meta_Title) || "",
  //   Meta_Description: (editProduct && editProduct?.Meta_Description) || "",
  //   Canonical_Tag: (editProduct && editProduct?.Canonical_Tag) || "",
  //   custom_url: (editProduct && editProduct?.custom_url) || "",
  //   breadCrum: (editProduct && editProduct?.breadCrum) || "",
  //   BannerText: (editProduct && editProduct?.BannerText) || "",
  //   BannerHeading: (editProduct && editProduct?.BannerHeading) || "",
  //   categoryHeroToptext: (editProduct && editProduct?.categoryHeroToptext) || "",
  //   categoryHeroHeading: (editProduct && editProduct?.categoryHeroHeading) || "",
  //   explore_Heading: (editProduct && editProduct?.explore_Heading) || "",
  //   explore_main_heading: (editProduct && editProduct?.explore_main_heading) || "",
  //   explore_description: (editProduct && editProduct?.explore_description) || "",
  //   seoSchema: (editProduct && editProduct?.seoSchema) || "",
  //   right_side_Heading: (editProduct && editProduct?.right_side_Heading    ) || "",
  //   Product_Section_heading: (editProduct && editProduct?.Product_Section_heading    ) || "",
  //   bottomText: (editProduct && editProduct?.bottomText    ) || "",
  //   left_side_Text: (editProduct && editProduct?.left_side_Text) ||[],
  //   categoryFaqs: (editProduct && editProduct?.categoryFaqs) || [],
  //   categoryHeroText: (editProduct && editProduct?.categoryHeroText) || [],
  //   Additionalinformation: (editProduct && editProduct?.Additionalinformation) || [],
  //   DescriptionBullets: (editProduct && editProduct?.DescriptionBullets) || [],
  //   variant: (editProduct && editProduct?.variant) || [],
  //   sizes: (editProduct && editProduct?.sizes) || [],
  //   Questions: (editProduct && editProduct?.sizes) || [],
    
    
  // };

  useEffect(() => {
    setProducts((ecomerece && ecomereceProducts) ? ecomereceProducts : productsData ?? []);
  }, [productsData, ecomereceProducts]);
  const productFlag: boolean = selecteMenu === "Add All Products" ? true : false;
  
  return (
    
    <DefaultLayout>
      <Breadcrumb pageName={`${ecomerece?  "E-Comerece Products" : "Products"}`} />
      {productFlag ? (
        <ViewProduct
          products={products}
          setProducts={setProducts}
          setselecteMenu={setselecteMenu}
          setEditProduct={setEditProduct}
          ecomerece={ecomerece}
        />
      ) : (
        <AddProd
          setselecteMenu={setselecteMenu}
          editProduct={editProduct}
          setEditProduct={setEditProduct}
          EditProductValue={editProduct &&(editProduct.name !== undefined ||editProduct.category !== undefined)? editProduct : undefined}
          categoriesList={categories}
          products={productsData}
          ecomerece={ecomerece}
        />
      )}
    </DefaultLayout>
  );
};

export default Product;
