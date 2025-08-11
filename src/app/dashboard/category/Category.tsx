'use client';

import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
const AddCategory = dynamic(()=> import("components/Dashboard/cat_subcat/Addcategory"));
const DashboardCat = dynamic(()=> import("components/Dashboard/cat_subcat/dashboard_cat"));
import DefaultLayout from 'components/Dashboard/DefaultLayout';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { Category } from 'types/cat';

const CATEGORY = ({ cetagories }: { cetagories: Category[] }) => {
  const [menuType, setMenuType] = useState<string>('Categories');
  const [editCategory, seteditCategory] = useState<Category | undefined | null>();
  const [AllCategories, setAllCategories] = useState<Category[]>([]);
  useEffect(() => {

    setAllCategories(cetagories)

  }, [cetagories])

  return (
    <DefaultLayout>
      <Breadcrumb pageName={menuType} />
      {menuType === 'Categories' ? (
        <div className="flex flex-col gap-10">
          <DashboardCat
            setMenuType={setMenuType}
            seteditCategory={seteditCategory}
            cetagories={AllCategories || []}
          />
        </div>
      ) : (
        <AddCategory
          setMenuType={setMenuType}
          seteditCategory={seteditCategory}
          editCategory={editCategory}
        />
      )}
    </DefaultLayout>
  );
};

export default CATEGORY;
