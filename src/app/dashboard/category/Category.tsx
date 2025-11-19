"use client";

import { useState } from "react";

import Breadcrumb from "@components/Dashboard/Breadcrumbs/Breadcrumb";
import DefaultLayout from "@components/Dashboard/DefaultLayout";
import DashboardCat from "@components/Dashboard/cat_subcat/dashboard_cat";
import AddCategory from "@components/Dashboard/cat_subcat/Addcategory";
import { Category } from "@/types/category";


const CategoryComponent = ({ categories }: { categories: Category[] }) => {
  const [menuType, setMenuType] = useState<string>("Categories");
  const [editCategory, setEditCategory] = useState<Category | undefined | null>();

  return (
    <DefaultLayout>
      <Breadcrumb pageName={menuType} />
      {menuType === "Categories" ? (
        <div className="flex flex-col gap-10">
          <DashboardCat
            setMenuType={setMenuType}
            setEditCategory={setEditCategory}
            categories={categories || []}
          />
        </div>
      ) : (
        <AddCategory
          setMenuType={setMenuType}
          editCategory={editCategory}
        />
      )}
    </DefaultLayout>
  );
};

export default CategoryComponent;
