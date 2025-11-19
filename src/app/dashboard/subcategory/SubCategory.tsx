"use client";
import Breadcrumb from "@components/Dashboard/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@components/Dashboard/DefaultLayout";
import { useState } from "react";
import AddSubcategory from "@components/Dashboard/cat_subcat/AddSubcategory";
import { Category, Subcategory } from "@/types/category";
import ViewSubcategories from "@components/Dashboard/cat_subcat/ViewSubcategries";

export interface SubCategoryComponentProps_dashboard {
  subCategories: Subcategory[];
  categories: Category[];
}

const SubCategoryComponent = ({categories,subCategories}: SubCategoryComponentProps_dashboard) => {
  const [menuType, setMenuType] = useState<string>("ViewSubCategory");
  const [editSubcategory, setEditEditSubcategory] = useState<Subcategory | undefined | null>();
  return (
    <DefaultLayout>
      <Breadcrumb pageName={menuType} />
      {menuType === "ViewSubCategory" ? (
        <div className="flex flex-col gap-10">
          <ViewSubcategories setMenuType={setMenuType} subCategories={subCategories} setEditEditSubcategory={setEditEditSubcategory} />
        </div>
      ) : (
        <AddSubcategory setMenuType={setMenuType} categories={categories} editSubcategory={editSubcategory} />
      )}
    </DefaultLayout>
  );
};

export default SubCategoryComponent;
