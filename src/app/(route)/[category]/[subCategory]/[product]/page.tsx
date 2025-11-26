import { OrderSection, RelatedProduct, Breadcrumb, BlindFitting, ProductDetail } from "@components";
import { fetchProducts, fetchSingleProduct } from "@config/fetch";
import { notFound } from "next/navigation";
import { GET_CARD_PRODUCT } from "@graphql";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ category: string; subCategory: string; product: string }>;
}) => {
  const {category, subCategory , product} = await params;
    const [productList ,SingleProduct] = await Promise.all([fetchProducts(GET_CARD_PRODUCT), fetchSingleProduct(category,subCategory,product)]);
  
    if (!SingleProduct) {
      notFound();
    }

    console.log(SingleProduct,"SingleProductSingleProduct")
  return (
    <>
      <Breadcrumb
        slug={category}
        subcategory={subCategory}
        title={SingleProduct?.Breadcrumb}
      />
      <div className="container mx-auto px-2">
        <ProductDetail
          category={category}
          productData={SingleProduct!}
        />
        <RelatedProduct titleStart title="RELATED PRODUCTS" data={productList} />
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
