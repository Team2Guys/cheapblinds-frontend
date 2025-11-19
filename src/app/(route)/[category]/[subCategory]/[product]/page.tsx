import { OrderSection, RelatedProduct, Breadcrumb, BlindFitting, ProductDetail } from "@components";
import { chooseBlinds } from "@data/home";

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
        <ProductDetail
          category={resolvedParams.category}
          subCategory={resolvedParams.subCategory}
        />
        <RelatedProduct titleStart title="RELATED PRODUCTS" data={chooseBlinds} />
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
