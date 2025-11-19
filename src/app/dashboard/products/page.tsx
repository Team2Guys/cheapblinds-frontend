import { fetchCategories, fetchProducts, fetchSubCategories } from "@config/fetch";
import Product from "./Products";

const page = async () => {
  const [category,subCategory, products] = await Promise.all([fetchCategories(),fetchSubCategories(), fetchProducts()]);
  console.log(products,"productsproducts")

  return <Product categoryList={category} productList={products} subCategoryList={subCategory} />;
};

export default page;
