import { Breadcrumb } from "@components";
import CategoryPage from "../Category";
import { fetchSingleSubCategory } from "@config/fetch";
import { Subcategory } from "@/types/category";
import { GET_SUBCATEGORY_BY_URLS } from "@graphql";
import { notFound } from "next/navigation";

const Page = async ({ params }: { params: Promise<{ category: string; subCategory: string }> }) => {
  const { category, subCategory } = await params;
  const SubCategoryList: Subcategory | null = await fetchSingleSubCategory(
    subCategory,
    category,
    GET_SUBCATEGORY_BY_URLS,
  );
  if (!SubCategoryList) {
    notFound();
  }
  console.log(SubCategoryList, "SubCategoryListSubCategoryList");
  const { name, description } = SubCategoryList;
  return (
    <>
      <Breadcrumb slug={category} title={subCategory} />
      <CategoryPage
        categoryName={name}
        description={description || ""}
        categoryUrl={category}
        ProductList={SubCategoryList}
      />
    </>
  );
};

export default Page;
