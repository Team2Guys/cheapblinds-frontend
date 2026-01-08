import { OrderSection, RelatedProduct, Breadcrumb, BlindFitting, ProductDetail } from "@components";
import { fetchSingleProduct, fetchSingleSubCategory } from "@config/fetch";
import { notFound } from "next/navigation";
import { GET_SUBCATEGORY_BY_URLS_QUERY } from "@graphql";
import { Product } from "@/types/category";
import { generateMeta } from "@utils/seoMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; subCategory: string; product: string }>;
}) {
  const { category, subCategory, product } = await params;
  const ProductList = await fetchSingleProduct(category, subCategory, product);
  if (!ProductList || ProductList.status !== "PUBLISHED") notFound();
  return generateMeta({
    title: ProductList.metaTitle,
    description: ProductList.metaDescription,
    canonicalUrl: ProductList.canonicalUrl,
    imageUrl: ProductList?.posterImageUrl,
    imageAlt: ProductList.name,
    fallbackPath: `/${category}/${subCategory}/${ProductList.slug}`,
  });
}

const ProductPage = async ({
  params,
}: {
  params: Promise<{ category: string; subCategory: string; product: string }>;
}) => {
  const { category, subCategory, product } = await params;
  const [productList, SingleProduct] = await Promise.all([
    fetchSingleSubCategory(subCategory, category, GET_SUBCATEGORY_BY_URLS_QUERY),
    fetchSingleProduct(category, subCategory, product),
  ]);

  if (!SingleProduct) {
    notFound();
  }
  if (SingleProduct.status !== "PUBLISHED") {
    notFound();
  }
  const publishedProduct = productList?.products?.filter(
    (item: Product) => item?.status === "PUBLISHED",
  );
  return (
    <>
      <Breadcrumb slug={category} subcategory={subCategory} title={SingleProduct?.breadcrumb} />
      <div className="container mx-auto px-2">
        <ProductDetail categorySlug={category} productData={SingleProduct} />
        <RelatedProduct
          titleStart
          title="RELATED PRODUCTS"
          category={category}
          subCategory={subCategory}
          data={publishedProduct || []}
        />
        <BlindFitting />
        <OrderSection
          className="mt-10 md:mt-16"
          reverse
          image1="/assets/images/home/cheap.webp"
          image2="/assets/images/home/sample.webp"
          btnText="Order Free Samples"
          btnLink="/sample"
          sampleSection
        />
      </div>
    </>
  );
};

export default ProductPage;
