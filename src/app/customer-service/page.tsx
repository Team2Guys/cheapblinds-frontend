import Image from "next/image";
import Link from "next/link";
import React from "react";
import { generateMetadata } from "@utils/seoMetadata";
import { metaData } from "@data/meta-data";
export const metadata = generateMetadata(metaData.customer_service);

const CustomerService = () => {
  const supportItems = [
    {
      id: "Order",
      title: "Order Queries",
      icon: "/assets/images/customer-service/order.png",
    },
    {
      id: "Delivery",
      title: "Delivery",
      icon: "/assets/images/customer-service/delivery.png",
    },
    {
      id: "Account",
      title: "My Account",
      icon: "/assets/images/customer-service/account.png",
    },
    {
      id: "Returns",
      title: "Returns and Refunds",
      icon: "/assets/images/customer-service/refund.png",
    },
  ];
  return (
    <div className="container mx-auto px-2 space-y-5 my-10">
      <div className="max-w-3xl mx-auto text-center space-y-2">
        <h1 className="text-heading">Customer Service</h1>
        <p className="text-sm">Experience exceptional customer support with us!</p>
        <p className="text-sm">
          For all your questions and queries, our customer service representatives are ready to
          assist you.
        </p>
        <p className="text-sm">You can contact us directly by call or WhatsApp at:</p>
        <Link href="tel:+971505974531" className="text-primary font-semibold underline">
          +971 50 597 4531.
        </Link>
        <p className="text-sm">
          Alternatively, you can email us on{" "}
          <Link className="text-primary underline" href="mailto:info@cheapblinds.ae">
            info@cheapblinds.ae
          </Link>
        </p>
        <hr className="border-b-2 text-secondary mx-4" />
      </div>
      <h2 className="text-medium text-center">What do you need help with today?</h2>

      <div className="bg-primary-light py-10 w-full">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6">
          {supportItems.map((item) => (
            <Link key={item.id} href={`#${item.id}`} scroll>
              <div className="bg-white w-[150px] h-[150px] shadow-sm rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-md transition">
                <Image unoptimized src={item.icon} alt={item.title} width={50} height={50} />
                <p className="text-center font-semibold">{item.title}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <h3 className="font-rubik font-semibold text-xl" id="Order">
        Order Queries
      </h3>
      <div className="border-l border-secondary px-2 space-y-4">
        <h4 className="font-semibold">Placing an order</h4>
        <p>
          If you’re not sure about the colours, you can even order free samples to be delivered to
          you. This will give you a much better idea of the colours, textures that might be harder
          to compare with on a screen. If you’re happy with what you’ve selected, go through the
          simple steps of customising your blinds, choose your payment method and your order will be
          delivered within 1-4 working days.
        </p>
        <h4 className="font-semibold">What happens once you&lsquo;ve placed an order?</h4>
        <p>
          Once you have placed an order with us, you will receive a confirmation email with all the
          important details such as your order number, the items you have purchased, and the total
          price. You will receive email updates on the progress of your order as well.
        </p>
        <h4 className="font-semibold" id="Delivery">
          Ways to pay
        </h4>
        <ul className="list-decimal px-6">
          <li>
            <strong>VISA</strong> (Debit/Credit card)
          </li>
          <li>
            <strong>Mastercard</strong> (Debit/Credit card)
          </li>
          <li>
            <strong>Apple Pay</strong> (Digital Wallet)
          </li>
          <li>
            <strong>G Pay</strong> (Google Pay) (Digital Wallet)
          </li>
          <li>
            <strong>Tabby</strong> (Buy Now, Pay Later service)
          </li>
          <li>
            <strong>Tamara</strong> (Buy Now, Pay Later service)
          </li>
        </ul>
        <h3 className="font-rubik font-semibold text-xl" id="Account">
          Delivery
        </h3>
        <p>
          If you have placed the order for your customised products online, you will receive them
          within 1-4 working days.
        </p>
        <p>
          Your free sample (up to 5 samples) will be delivered to you within 24 hours after placing
          the order.
        </p>
        <p>
          To find out more about delivery services, please{" "}
          <Link className="text-primary underline" href="/delivery-policy/">
            click here
          </Link>
        </p>

        <h3 className="font-rubik font-semibold text-xl" id="Returns">
          My Account
        </h3>
        <h4 className="font-semibold">Where can I log in to my account?</h4>
        <p>
          You can click the account button at the top of the page or you can click this{" "}
          <Link className="text-primary underline" href="/account">
            link
          </Link>
          .
        </p>
        <h4 className="font-semibold">How can I reset my password?</h4>
        <p>
          <Link className="text-primary underline" href="/forgot-password">
            Click here
          </Link>{" "}
          to reset your password.
        </p>

        <h3 className="font-rubik font-semibold text-xl">Returns & Refunds</h3>
        <p>
          <Link className="text-primary underline" href="/returns-refunds">
            Click here
          </Link>{" "}
          to find out more about our returns and refunds policy.
        </p>
      </div>
    </div>
  );
};

export default React.memo(CustomerService);
