import { fetchCategories } from "@config/fetch";
import Category from "./Category";

const AddCategory = async () => {
  const categories = await fetchCategories();
  return <Category categories={categories} />;
};

export default AddCategory;
