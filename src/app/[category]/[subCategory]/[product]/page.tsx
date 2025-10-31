import BlindFitting from "components/common/blind-fitting";
import RelatedProduct from "components/common/related-product";
import OrderSection from "components/Home/OrderSection";
import Breadcrumb from "components/Layout/breadcrumb";
import ProductDetail from "components/product/Product-detail";
import { chooseblinds } from "data/home";

const ProductPage = async ({
  params,
}: {
  params: Promise<{ category: string; subCategory: string; product: string }>;
}) => {
  const resolvedParams = await params;
  return (
    <>
      <Breadcrumb
        slug={resolvedParams.category}
        subcategory={resolvedParams.subCategory}
        title={resolvedParams.product}
      />
      <div className="container mx-auto px-2">
        <ProductDetail />
        <RelatedProduct titleStart title="RELATED PRODUCTS" data={chooseblinds} />
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
