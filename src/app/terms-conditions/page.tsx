import Link from "next/link";
import React from "react";
import { generateMetadata } from "@utils/seoMetadata";
import { metaData } from "@data/meta-data";
export const metadata = generateMetadata(metaData.terms_conditions);

const TermsConditions = () => {
  return (
    <div className="container mx-auto px-2 space-y-5 my-10">
      <h1 className="text-heading">
        Terms and Conditions –{" "}
        <Link className="text-primary underline " href="/">
          CheapBlinds.ae
        </Link>
      </h1>
      <div className="space-y-3">
        <h2 className="text-xl font-semibold font-rubik">Welcome</h2>
        <p>
          Welcome to{" "}
          <Link className="text-primary underline " href="/">
            www.cheapblinds.ae!
          </Link>{" "}
          By using our website, you agree to these Terms and Conditions. If something doesn’t feel
          right, please don’t use the site. We aim to make shopping for blinds easy, safe, and
          enjoyable, whether you’re browsing from home or on the go.
        </p>
      </div>
      <div className="space-y-3">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold font-rubik">Ordering and Payments</h2>
          <p>
            When you place an order, we’ll do our best to ensure the products are available. Prices,
            promotions, and offers may change without notice. Payments must be made through the
            secure methods provided on our website. You can also order free samples, and for
            selected products, enjoy next-day delivery.
          </p>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-semibold font-rubik">Products and Blinds</h2>
          <p>
            We offer a wide range of blinds. Each product comes with accurate descriptions, images,
            and dimensions, but please note colours may vary slightly due to screens or lighting.
            All our blinds are designed with child safety in mind, and any cords or loops come with
            the relevant safety devices and instructions.
          </p>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-semibold font-rubik">Motorisation & Smart Home</h2>
          <p>
            Many of our blinds can be upgraded with motorised controls, allowing you to operate them
            via remote, pull control, or smartphone using Bluetooth. These can also be integrated
            with other smart home devices for automation, voice control, and enhanced home security.
          </p>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-semibold font-rubik">Warranty</h2>
          <p>
            Products come with the warranty specified in their descriptions. Warranty claims must
            follow the instructions provided with each product. This ensures your blinds stay
            covered and protected for peace of mind.
          </p>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-semibold font-rubik">Returns and Refunds</h2>
          <p>
            Returns and refunds are handled according to our <strong>Return Policy</strong>.
            Products should be returned in their original condition and packaging, unless faulty.
          </p>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-semibold font-rubik">Shipping and Delivery</h2>
          <p>
            Delivery times are estimated and may vary depending on your location and product
            availability. CheapBlinds.ae is not responsible for delays caused by third-party
            delivery services, though we always aim to get your order to you quickly.
          </p>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-semibold font-rubik">Privacy</h2>
          <p>
            We respect your privacy. Your personal information is collected and handled in
            accordance with our <strong>Privacy Policy</strong>.
          </p>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-semibold font-rubik">Intellectual Property</h2>
          <p>
            All images, content, logos, and designs on this website are the property of{" "}
            <Link className="text-primary underline " href="/">
              www.cheapblinds.ae
            </Link>
            . No part may be copied or reproduced without written permission.
          </p>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-semibold font-rubik">Limitation of Liability</h2>
          <p>
            <Link className="text-primary underline " href="/">
              www.cheapblinds.ae
            </Link>{" "}
            is not responsible for any indirect, incidental, or accidental damages that may result
            from using our website or products.
          </p>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-semibold font-rubik">Changes to Terms</h2>
          <p>
            We may update these Terms and Conditions from time to time. Continued use of the website
            after changes means you accept the updated terms.
          </p>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-semibold font-rubik">Governing Law</h2>
          <p>These Terms and Conditions are governed by the laws of the United Arab Emirates.</p>
        </div>

        <div className="space-y-1">
          <h2 className="text-xl font-semibold font-rubik">Contact Us</h2>
          <p>
            If you have any questions about these Terms and Conditions or your order, please contact
            us at{" "}
          </p>
          <p>
            <strong>Email:</strong>{" "}
            <Link className="text-primary underline " href="mailto:cs@cheapblinds.ae">
              cs@cheapblinds.ae
            </Link>
          </p>
          <p>
            <strong>Phone:</strong>{" "}
            <Link className="text-primary underline " href="tel:+971505974531">
              +971 50 597 4531
            </Link>
          </p>
          <p>
            <strong>Hours:</strong> 7 days a week: 9 AM – 9 PM (live chat only)
          </p>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TermsConditions);
