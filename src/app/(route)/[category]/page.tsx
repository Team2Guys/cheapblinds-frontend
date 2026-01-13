import { Breadcrumb } from "@components";
import { queryData } from "@config/fetch";
import CategoryPage from "./Category";
import { notFound } from "next/navigation";
import { Category } from "@/types/category";
import { generateMeta } from "@utils/seoMetadata";
import { CATEGORY_BY_PATH } from "@graphql";
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
     const categoryPath = `/${category}`;
  const categoryList: Category | null = await queryData<Category | null>(
    CATEGORY_BY_PATH,
    'categoryByPath',
    { path: categoryPath } 
  );

  if (!categoryList || categoryList.status !== "PUBLISHED") {
    notFound();
  }

  return generateMeta({
    title: categoryList.metaTitle,
    description: categoryList.metaDescription,
    canonicalUrl: categoryList.canonicalUrl,
    imageUrl: categoryList?.posterImageUrl,
    imageAlt: categoryList.name,
    fallbackPath: categoryList.newPath,
  });
}

const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;
   const categoryPath = `/${category}`;
  const categoryList: Category | null = await queryData<Category | null>(
    CATEGORY_BY_PATH,
    'categoryByPath',
    { path: categoryPath } 
  );

  if (!categoryList) {
    notFound();
  }
  if (categoryList.status !== "PUBLISHED") {
    notFound();
  }
  const { name, description, subcategories = [] } = categoryList;
  return (
    <>
      <Breadcrumb title={category} />
      <CategoryPage
        categoryName={name}
        description={description || ""}
        ProductList={subcategories || []}
      />
    </>
  );
};

export default Page;
