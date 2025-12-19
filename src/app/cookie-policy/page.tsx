import Link from "next/link";
import React from "react";
import { generateMetadata } from "@utils/seoMetadata";
import { metaData } from "@data/meta-data";
export const metadata = generateMetadata(metaData.cookie);

const CookiePolicy = () => {
  return (
    <div className="container mx-auto px-2 space-y-5 my-10">
      <h1 className="text-heading">Cookie Policy – Cheap Blinds</h1>
      <p>
        At Cheap Blinds, we use cookies on our website{" "}
        <Link className="text-primary underline " href="/">
          cheapblinds.ae
        </Link>{" "}
        to enhance your browsing and shopping experience. Cookies are small files stored on your
        device that help us improve website functionality and provide personalised services.
      </p>
      <div className="space-y-3">
        <h2 className="font-rubik text-xl font-semibold">Types of Cookies We Use</h2>
        <ul className="list-decimal px-6 space-y-2">
          <li>
            <div>
              <h3 className="font-semibold">Functionality Cookies</h3>
              <p>
                These cookies remember your preferences, such as language or saved products, to make
                your experience smoother.
              </p>
            </div>
          </li>
          <li>
            <div>
              <h3 className="font-semibold">Analytics Cookies</h3>
              <p>
                These cookies help us understand how visitors use our website, which pages are most
                popular, and how we can improve our services.
              </p>
            </div>
          </li>
          <li>
            <div>
              <h3 className="font-semibold">Preference Cookies</h3>
              <p>
                Preference cookies store your choices to personalise your shopping experience, such
                as recommended products or previously viewed items.
              </p>
            </div>
          </li>
          <li>
            <div>
              <h3 className="font-semibold">Advertising/Targeting Cookies</h3>
              <p>
                These cookies help us show you relevant ads and promotions and measure the
                effectiveness of our marketing campaigns.
              </p>
            </div>
          </li>
        </ul>
      </div>
      <div className="space-y-3">
        <h2 className="font-rubik text-xl font-semibold">Managing Cookies</h2>
        <p>You can manage or disable cookies through your browser settings:</p>
        <ul className="list-disc px-6">
          <li>Block new cookies</li>
          <li>Delete existing cookies</li>
          <li>Receive notifications when a new cookie is set</li>
        </ul>
        <p>
          <strong>Note:</strong> Disabling cookies may affect certain website features, like saving
          items in your cart, personalised recommendations, or login sessions. By continuing to use
          our website, you consent to our use of cookies in accordance with this policy.
        </p>
      </div>
    </div>
  );
};

export default CookiePolicy;
