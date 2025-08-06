'use client';
import Breadcrumb from 'components/Dashboard/Breadcrumbs/Breadcrumb';
import DefaultLayout from 'components/Dashboard/DefaultLayout';
import { useEffect, useState } from 'react';
import { INNERSUBCATEGORY, ISUBCATEGORY } from 'types/cat';
import dynamic from 'next/dynamic';
const AddInnerSubcatgory = dynamic(() => import("components/Dashboard/cat_subcat/AddInnerSubcatgory"))
const ViewInnerSubcategories = dynamic(() => import("components/Dashboard/cat_subcat/ViewInnerSubcategories"))


interface INNERPROPS {
  InnerSubCategories : INNERSUBCATEGORY[]
    subCategories  :ISUBCATEGORY[]
}


const InnerSubCategoryComponent = ({
  subCategories,
  InnerSubCategories,
}: INNERPROPS) => {
  const [menuType, setMenuType] = useState<string>('Inner Sub Categories');
  const [editCategory, seteditCategory] = useState<INNERSUBCATEGORY | null | undefined>();
  const [updatedsubCategories, setUpdatedCategories] = useState(InnerSubCategories);
  


  useEffect(() => {
    setUpdatedCategories(InnerSubCategories);
  }, [InnerSubCategories]);

  return (
    <DefaultLayout>
      <Breadcrumb pageName={menuType} />
      {menuType == 'Inner Sub Categories' ? (
        <div className="flex flex-col gap-10">
          <ViewInnerSubcategories
            setMenuType={setMenuType}
            seteditCategory={seteditCategory}
            editCategory={editCategory}
            Innersubcategory={updatedsubCategories}
          />
        </div>
      ) : (
        <AddInnerSubcatgory
          setMenuType={setMenuType}
          seteditCategory={seteditCategory}
          editCategory={editCategory}
          subCategories={subCategories}
        />
      )}
    </DefaultLayout>
  );
};

export default InnerSubCategoryComponent;
