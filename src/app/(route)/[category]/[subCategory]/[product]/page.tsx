import { OrderSection, RelatedProduct, Breadcrumb, BlindFitting, ProductDetail } from "@components";
import { fetchProducts, fetchSingleProduct } from "@config/fetch";
import { notFound } from "next/navigation";
import { GET_CARD_PRODUCT_QUERY } from "@graphql";
import { Product } from "@/types/category";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ category: string; subCategory: string; product: string }>;
}) => {
  const { category, subCategory, product } = await params;
  const [productList, SingleProduct] = await Promise.all([
    fetchProducts(GET_CARD_PRODUCT_QUERY),
    fetchSingleProduct(category, subCategory, product),
  ]);

  if (!SingleProduct) {
    notFound();
  }
  if (SingleProduct.status !== "PUBLISHED") {
    notFound();
  }
  const publishedProduct = productList?.filter((item: Product) => item?.status === "PUBLISHED");
  console.log(SingleProduct, "SingleProductSingleProduct");

  return (
    <>
      <Breadcrumb slug={category} subcategory={subCategory} title={SingleProduct?.breadcrumb} />
      <div className="container mx-auto px-2">
        <ProductDetail category={category} productData={SingleProduct!} />
        <RelatedProduct titleStart title="RELATED PRODUCTS" data={publishedProduct || []} />
        <BlindFitting />
        <OrderSection
          className="mt-10 md:mt-16"
          reverse
          image1="/assets/images/home/cheap.webp"
          image2="/assets/images/home/sample.webp"
          btnText="Order Free Samples"
          btnLink="/sample"
          samplesection
        />
      </div>
    </>
  );
};

export default ProductPage;
