import { Breadcrumb } from "@components";
import CategoryPage from "../Category";
import { fetchSingleSubCategory } from "@config/fetch";
import { Subcategory } from "@/types/category";
import { GET_SUBCATEGORY_BY_URLS_QUERY } from "@graphql";
import { notFound } from "next/navigation";
import { generateMeta } from "@utils/seoMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; subCategory: string }>;
}) {
  const { category, subCategory } = await params;
  const SubCategoryList = await fetchSingleSubCategory(
    subCategory,
    category,
    GET_SUBCATEGORY_BY_URLS_QUERY,
  );
  if (!SubCategoryList || SubCategoryList.status !== "PUBLISHED") notFound();
  return generateMeta({
    title: SubCategoryList.metaTitle,
    description: SubCategoryList.metaDescription,
    canonicalUrl: SubCategoryList.canonicalUrl,
    imageUrl: SubCategoryList?.posterImageUrl,
    imageAlt: SubCategoryList.name,
    fallbackPath: `/${category}/${SubCategoryList.slug || subCategory}`,
  });
}

const Page = async ({ params }: { params: Promise<{ category: string; subCategory: string }> }) => {
  const { category, subCategory } = await params;
  const SubCategoryList: Subcategory | null = await fetchSingleSubCategory(
    subCategory,
    category,
    GET_SUBCATEGORY_BY_URLS_QUERY,
  );
  if (!SubCategoryList) {
    notFound();
  }
  if (SubCategoryList.status !== "PUBLISHED") {
    notFound();
  }

  const { name, description } = SubCategoryList;
  return (
    <>
      <Breadcrumb slug={category} title={subCategory} />
      <CategoryPage
        categoryName={name}
        description={description || ""}
        ProductList={SubCategoryList}
      />
    </>
  );
};

export default Page;
