import { HeroSection, Breadcrumb, ContactHelp, ContactPage } from "@components";
import { generateMetadata } from "@utils/seoMetadata";
import { metaData } from "@data/meta-data";
export const metadata = generateMetadata(metaData.contact);

const page = () => {
  return (
    <>
      <Breadcrumb title="Contact Us" />
      <div className="bg-primary-light">
        <HeroSection
          desktopImage="/assets/images/call-banner.webp"
          mobileImage="/assets/images/call-banner-mobile.png"
          className="aspect-16/18 sm:aspect-21/5"
          link="tel:+971 50 597 4531"
        />
      </div>
      <ContactHelp />
      <ContactPage IsHide />
      <div className="px-2">
        <HeroSection
          desktopImage="/assets/images/home/free-order/free-order.webp"
          mobileImage="/assets/images/home/free-order/free-order-mobile.png"
          className="container mx-auto aspect-12/9 sm:aspect-21/8"
        />
        <HeroSection
          desktopImage="/assets/images/home/payment.jpg"
          className="container mx-auto aspect-12/9 sm:aspect-21/8 mt-10 md:mt-16"
        />
      </div>
    </>
  );
};

export default page;
