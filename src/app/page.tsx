import {
  InformationSection,
  ChildSafety,
  ContactBanner,
  OrderSection,
  ShopBySlider,
  RelatedProduct,
  JobDone,
  HeroSection,
  BlindFitting,
} from "@components";
import { chooseImage } from "@data/home";
import { Category, Product } from "@/types/category";
import { generateMetadata } from "@utils/seoMetadata";
import { metaData } from "@data/meta-data";
import { CARD_CATEGORY, CARD_PRODUCT } from "@graphql";
import { queryData } from "@config/fetch";
export const metadata = generateMetadata(metaData.home);

const Home = async () => {
  const categoryList: Category[] = await queryData<Category[]>(CARD_CATEGORY, "categoryList");
  const productList: Product[] = await queryData<Product[]>(CARD_PRODUCT, "productList");
  const publishedProduct = productList?.filter((item: Product) => item?.status === "PUBLISHED");
  const publishedCategory = categoryList?.filter((item: Category) => item?.status === "PUBLISHED");

  return (
    <>
      <HeroSection
        desktopImage="/assets/images/home/banner.webp"
        mobileImage="/assets/images/home/banner-mobile.webp"
        isHome
      />
      <InformationSection className="hidden md:grid" />
      <ChildSafety />
      <ShopBySlider categoryList={publishedCategory || []} />
      <OrderSection
        reverse={false}
        image1="/assets/images/home/blind-image.webp"
        image2="/assets/images/home/zebra-image.webp"
        btnText="Explore More"
        btnLink="/motorised-blinds"
      />
      <div className="px-2">
        <HeroSection
          desktopImage="/assets/images/home/free-order/free-order.webp"
          mobileImage="/assets/images/home/free-order/free-order-mobile.png"
          className="container mx-auto h-[400px] md:h-auto md:max-h-[500px] 2xl:max-h-[600px]"
          link="/roller-blinds/"
        />
        <HeroSection
          desktopImage="/assets/images/home/payment.jpg"
          className="container mx-auto h-auto  md:max-h-[450px] 2xl:max-h-[550px] mt-10 md:mt-16"
        />
      </div>
      <RelatedProduct title="Browse Products" data={publishedProduct || []} />
      <OrderSection
        className="mt-10 md:mt-16"
        reverse
        image1="/assets/images/home/cheap.webp"
        image2="/assets/images/home/sample.webp"
        btnText="Order Free Samples"
        btnLink="/roller-blinds"
        buttonCenter
        sampleSection
      />
      <BlindFitting />
      <ContactBanner />
      <JobDone
        title="Jobs Done"
        description="You can prevent the use of cookies by changing the settings in your web browser so that (i) it does not accept new cookies, (ii) it informs you about new cookies, or (iii) it deletes all already received cookies. By deleting or disabling future cookies, your user experience may "
        data={chooseImage}
      />
    </>
  );
};

export default Home;
