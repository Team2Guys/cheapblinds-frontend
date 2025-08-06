import { fetchinnerSubCategories, fetchSubCategories } from 'config/fetch';
import InnerSubCategoryComponent from './InnerSubCategory';

const AddSubCategory = async () => {
  const [ subCategories, InnerSubCategories] = await Promise.all([fetchSubCategories(),fetchinnerSubCategories()]);
  return (
    <InnerSubCategoryComponent
      subCategories={subCategories}
      InnerSubCategories={InnerSubCategories}
    />
  );
};

export default AddSubCategory;
