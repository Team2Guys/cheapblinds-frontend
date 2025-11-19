import { fetchCategories, fetchSubCategories } from "@config/fetch";
import SubCategoryComponent from "./SubCategory";

const AddSubCategory = async () => {
  const [categories, subCategories] = await Promise.all([fetchCategories(), fetchSubCategories()]);
  return <SubCategoryComponent subCategories={subCategories} categories={categories} />;
};

export default AddSubCategory;
