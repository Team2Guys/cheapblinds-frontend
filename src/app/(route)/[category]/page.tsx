import { Breadcrumb } from "@components";
import { GET_CATEGORY_BY_CUSTOM_URL } from "@graphql";
import { fetchSingleCategory } from "@config/fetch";
import CategoryPage from "./Category";
import { notFound } from "next/navigation";
import { Category } from "@/types/category";

const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;
  const CategoryList: Category | null = await fetchSingleCategory(category, GET_CATEGORY_BY_CUSTOM_URL);
  if (!CategoryList) {
    notFound();
  }

  const { name, customUrl, description, subcategories = [] } = CategoryList;

  return (
    <>
      <Breadcrumb title={category} />
      <CategoryPage categoryName={name} categoryUrl={customUrl || ""} description={description || ""} ProductList={subcategories || []} />
    </>
  );
};

export default Page;
