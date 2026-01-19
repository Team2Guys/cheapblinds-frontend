import { OrderSection, RelatedProduct, Breadcrumb, BlindFitting, ProductDetail } from "@components";
import { queryData } from "@config/fetch";
import { notFound } from "next/navigation";
import { PRODUCT_BY_PATH, SUBCATEGORY_BY_PATH } from "@graphql";
import { Product, Subcategory } from "@/types/category";
import { generateMeta } from "@utils/seoMetadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; subCategory: string; product: string }>;
}) {
  const { category, subCategory, product } = await params;
  const ProductList: Product | null = await queryData<Product | null>(
    PRODUCT_BY_PATH,
    "productByPath",
    { path: `/${category}/${subCategory}/${product}/` },
  );

  if (!ProductList || ProductList.status !== "PUBLISHED") notFound();
  return generateMeta({
    title: ProductList.metaTitle,
    description: ProductList.metaDescription,
    canonicalUrl: ProductList.canonicalUrl,
    imageUrl: ProductList?.posterImageUrl,
    imageAlt: ProductList.name,
    fallbackPath: ProductList.newPath,
  });
}

const ProductPage = async ({
  params,
}: {
  params: Promise<{ category: string; subCategory: string; product: string }>;
}) => {
  const { category, subCategory, product } = await params;

  const SingleProduct: Product | null = await queryData<Product | null>(
    PRODUCT_BY_PATH,
    "productByPath",
    { path: `/${category}/${subCategory}/${product}/` },
  );

  const productList: Subcategory | null = await queryData<Subcategory | null>(
    SUBCATEGORY_BY_PATH,
    "subcategoryByPath",
    { path: `/${category}/${subCategory}` },
  );
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
      <Breadcrumb newPath={category} subcategory={subCategory} title={SingleProduct?.breadcrumb} />
      <div className="container mx-auto px-2">
        <ProductDetail categorySlug={category} productData={SingleProduct} />
        <RelatedProduct titleStart title="RELATED PRODUCTS" data={publishedProduct || []} />
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
