import { Breadcrumb } from "@components";
import CategoryPage from "../Category";
import { queryData } from "@config/fetch";
import { Subcategory } from "@/types/category";
import { SUBCATEGORY_BY_PATH } from "@graphql";
import { notFound } from "next/navigation";
import { generateMeta } from "@utils/seoMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; subCategory: string }>;
}) {
  const { category, subCategory } = await params;
  const categoryPath = `/${category}/${subCategory}`;
  const subCategoryList: Subcategory | null = await queryData<Subcategory | null>(
    SUBCATEGORY_BY_PATH,
    "subcategoryByPath",
    { path: categoryPath },
  );
  if (!subCategoryList || subCategoryList.status !== "PUBLISHED") notFound();
  return generateMeta({
    title: subCategoryList.metaTitle,
    description: subCategoryList.metaDescription,
    canonicalUrl: subCategoryList.canonicalUrl,
    imageUrl: subCategoryList?.posterImageUrl,
    imageAlt: subCategoryList.name,
    fallbackPath: subCategoryList.newPath,
  });
}

const Page = async ({ params }: { params: Promise<{ category: string; subCategory: string }> }) => {
  const { category, subCategory } = await params;
  const categoryPath = `/${category}/${subCategory}`;
  const subCategoryList: Subcategory | null = await queryData<Subcategory | null>(
    SUBCATEGORY_BY_PATH,
    "subcategoryByPath",
    { path: categoryPath },
  );

  if (!subCategoryList) {
    notFound();
  }
  if (subCategoryList.status !== "PUBLISHED") {
    notFound();
  }

  const { name, description } = subCategoryList;
  return (
    <>
      <Breadcrumb newPath={category} title={subCategory} />
      <CategoryPage
        categoryName={name}
        description={description || ""}
        ProductList={subCategoryList}
      />
    </>
  );
};

export default Page;
