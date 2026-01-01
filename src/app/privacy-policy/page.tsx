import Link from "next/link";
import React from "react";
import { generateMetadata } from "@utils/seoMetadata";
import { metaData } from "@data/meta-data";
export const metadata = generateMetadata(metaData.privacy_policy);

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-2 space-y-5 my-10">
      <h1 className="text-heading">Privacy Policy – Cheap Blinds</h1>
      <div className="space-y-3">
        <h2 className="font-rubik font-semibold text-xl">Introduction</h2>
        <p>
          At Cheap Blinds, we respect your privacy and are committed to protecting your personal
          information. This Privacy Policy explains how we collect, use, and secure your data when
          you visit{" "}
          <Link className="text-primary underline " href="/">
            cheapblinds.ae
          </Link>{" "}
          or use our services. By using our website, you agree to the practices described in this
          policy. We may update this policy occasionally, and any changes will be posted on our
          website.
        </p>
        <h3 className="font-semibold">Information We Collect</h3>
        <ul className="list-disc px-6">
          <li>
            <strong>Information you provide:</strong> Name, email, phone number, address, account
            details, payment info, messages, reviews, or survey responses. This helps us process
            orders, communicate updates, and personalise your experience.
          </li>
          <li>
            <strong>Information we collect automatically:</strong> IP address, device type, pages
            visited, products viewed or saved, and browsing history. This helps improve our website,
            provide relevant recommendations, and ensure security.
          </li>
          <li>
            <strong>Information from third parties:</strong> If you log in with Google, Facebook, or
            Instagram, we may collect public profile info to complete your account and personalise
            your experience.
          </li>
        </ul>

        <h2 className="font-rubik font-semibold text-xl">How We Use Your Information</h2>
        <p>
          We use your information to provide and improve our services. This includes processing your
          orders and payments, delivering products, sending updates about your orders or account,
          personalising your experience on the website, recommending products, improving website
          functionality, and preventing fraud. We may also use your information to communicate about
          promotions, surveys, or contests, but only with your consent.
        </p>
      </div>
      <h2 className="font-rubik font-semibold text-xl">Sharing of Information</h2>
      <p>
        Your personal information is treated with the highest level of privacy. We do not sell,
        rent, or lease your personal information to third parties for marketing purposes. We may
        share your information with trusted partners only to fulfil orders, process payments, or
        comply with legal obligations.
      </p>
      <h2 className="font-rubik font-semibold text-xl">Security Measures</h2>
      <p>
        We use technical and organisational measures to protect your data from unauthorised access,
        misuse, or disclosure. It is also important that you keep your account credentials secure,
        log out of shared devices, and avoid sharing sensitive information.
      </p>

      <h2 className="font-rubik font-semibold text-xl">User Rights</h2>
      <p>
        You have the right to access, update, or delete the personal information we hold about you.
        You can also manage your communication preferences and opt out of marketing emails.
        Additionally, you can control your browser&apos;s cookie settings to enhance privacy while
        using our website.
      </p>

      <h2 className="font-rubik font-semibold text-xl">Cookies</h2>
      <p>
        Our website uses cookies to provide you with a smooth and personalised experience. Cookies
        help us remember your preferences, track website performance, analyse usage, and show
        relevant advertisements. For more details, please see our Cookie Policy.
      </p>

      <h2 className="font-rubik font-semibold text-xl">Contact Information</h2>
      <p>
        If you have any questions or concerns about your privacy or this policy, you can reach our
        Customer Service team at
      </p>
      <ul className="list-disc px-6">
        <li>
          <strong>Email:</strong>{" "}
          <Link className="text-primary underline " href="mailto:help@cheapblinds.ae">
            help@cheapblinds.ae
          </Link>
        </li>
        <li>
          <strong>Phone:</strong>{" "}
          <Link className="text-primary underline " href="tel:+971505974531">
            +971 50 597 4531
          </Link>
        </li>
        <li>
          <strong>Hours:</strong> 7 days a week: 9 AM – 9 PM (live chat only)
        </li>
      </ul>

      <h2 className="font-rubik font-semibold text-xl">Changes to This Privacy Policy</h2>
      <p>
        We may update this Privacy Policy from time to time to reflect changes in our practices or
        legal requirements. Please review this page regularly to stay informed about how we protect
        your information.
      </p>
    </div>
  );
};

export default React.memo(PrivacyPolicy);
