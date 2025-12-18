import { HeroSection, Breadcrumb, ContactHelp, ContactPage } from "@components";

const page = () => {
  return (
    <>
      <Breadcrumb title="Contact Us" />
      <div className="bg-primary-light">
        <HeroSection
          desktopImage="/assets/images/call-banner.webp"
          mobileImage="/assets/images/call-banner-mobile.webp"
          className="container mx-auto h-[300px] lg:h-[350px]"
        />
      </div>
      <ContactHelp />
      <ContactPage IsHide />
      <div className="px-2">
        <HeroSection
          desktopImage="/assets/images/home/free-order/free-order.webp"
          mobileImage="/assets/images/home/free-order/free-order-mobile.png"
          className="container mx-auto h-[400px] md:h-auto md:max-h-[500px]"
        />
        <HeroSection
          desktopImage="/assets/images/home/payment.jpg"
          className="container mx-auto h-auto md:max-h-[500px] mt-10 md:mt-16"
        />
      </div>
    </>
  );
};

export default page;
