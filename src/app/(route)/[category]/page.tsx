import { Breadcrumb } from "@components";
import { fetchSingleCategory } from "@config/fetch";
import CategoryPage from "./Category";
import { notFound } from "next/navigation";
import { Category } from "@/types/category";
import { generateMeta } from "@utils/seoMetadata";
export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const CategoryList = await fetchSingleCategory(category);

  if (!CategoryList || CategoryList.status !== "PUBLISHED") {
    notFound();
  }

  return generateMeta({
    title: CategoryList.metaTitle,
    description: CategoryList.metaDescription,
    canonicalUrl: CategoryList.canonicalUrl,
    imageUrl: CategoryList?.posterImageUrl,
    imageAlt: CategoryList.name,
    fallbackPath: `/${category}`,
  });
}

const Page = async ({ params }: { params: Promise<{ category: string }> }) => {
  const { category } = await params;
  const CategoryList: Category | null = await fetchSingleCategory(category);
  if (!CategoryList) {
    notFound();
  }
  if (CategoryList.status !== "PUBLISHED") {
    notFound();
  }
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
