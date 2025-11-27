import { Breadcrumb } from "@components";
import { fetchSingleCategory } from "@config/fetch";
import CategoryPage from "./Category";
import { notFound } from "next/navigation";
import { Category } from "@/types/category";

const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;
  const CategoryList: Category | null = await fetchSingleCategory(category);
  if (!CategoryList) {
    notFound();
  }
  console.log(CategoryList, "CategoryListCategoryList");
  const { name, slug, description, subcategories = [] } = CategoryList;

  return (
    <>
      <Breadcrumb title={category} />
      <CategoryPage
        categoryName={name}
        categoryUrl={slug || ""}
        description={description || ""}
        ProductList={subcategories || []}
      />
    </>
  );
};

export default Page;
