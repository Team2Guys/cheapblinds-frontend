'use client';

import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import AddCategory from 'components/Dashboard/cat_subcat/Addcategory';
import DashboardCat from 'components/Dashboard/cat_subcat/dashboard_cat';
import DefaultLayout from 'components/Dashboard/DefaultLayout';
import { useEffect, useState } from 'react';
import { Category } from 'types/cat';

const CATEGORY = ({ cetagories }: { cetagories: Category[] }) => {
  const [menuType, setMenuType] = useState<string>('Categories');
  const [editCategory, seteditCategory] = useState<Category | undefined | null>();
  const [AllCategories, setAllCategories] = useState<Category[]>([]);
  // const { data, loading, error } = useQuery(FETCH_ALL_CATEGORIES);
  // console.log(data,'data' , loading, 'loading', error)
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
            // editCategory={editCategory}
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
