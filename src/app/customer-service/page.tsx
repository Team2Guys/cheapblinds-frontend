import Image from "next/image";
import React from "react";

const CustomerService = () => {
  const supportItems = [
    {
      title: "Order Queries",
      icon: "/assets/images/customer-service/order.png",
    },
    {
      title: "Delivery",
      icon: "/assets/images/customer-service/delivery.png",
    },
    {
      title: "My Account",
      icon: "/assets/images/customer-service/account.png",
    },
    {
      title: "Returns and Refunds",
      icon: "/assets/images/customer-service/refund.png",
    },
  ];
  return (
    <div className="container mx-auto px-2 space-y-5 my-10">
      <div className="max-w-3xl mx-auto text-center space-y-2">
        <h1 className="text-heading">Customer Service</h1>
        <p className="text-sm">Engage in seamless customer experience with us!</p>
        <p className="text-sm">
          For all your question and queries, We have compiled a list of those most frequently asked,
          divided into handy section below For further queries, call us.
        </p>
        <hr className="border-b-2 text-secondary mx-4" />
      </div>
      <h2 className="text-medium text-center">What do you need help with today?</h2>

      <div className="bg-primary-light py-10 w-full">
        <div className="max-w-5xl mx-auto flex flex-wrap justify-center gap-6">
          {supportItems.map((item, index) => (
            <div
              key={index}
              className="bg-white w-[150px] h-[150px] shadow-sm rounded-lg flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-md transition"
            >
              <Image src={item.icon} alt={item.title} width={50} height={50} />
              <p className="text-center font-semibold">{item.title}</p>
            </div>
          ))}
        </div>
      </div>
      <h3 className="font-rubik font-semibold text-xl">Placing an order online</h3>
      <div className="border-l border-secondary px-2 space-y-4">
        <h4 className="font-semibold">Placing an order</h4>
        <p>
          There are multiple ways to place an order for your made-to-measure curtains, blinds, and
          accessories.
        </p>
        <ul className="list-disc px-6">
          <li>
            You can select your favourite product, fill in the measurements and add it to your cart.
            Your customized product will be delivered to you within 1-4 working days.
          </li>
          <li>Upon filling out the inquiry form available on the website.</li>
        </ul>
        <h4 className="font-semibold">What happens once you&apos;ve placed an order?</h4>
        <p>
          Once you have placed an order with us, you will receive a confirmation email with all the
          important details such as your order number, the items and services you have purchased,
          and the total price. You will receive email updates on the progress of your order.
        </p>
        <h4 className="font-semibold">What happens once you have filled out an inquiry form?</h4>
        <p>
          If you have filled out the inquiry form, one of our experts will visit your home or office
          to take the right measurements for your customized blinds, curtains, and other
          accessories. Upon taking the measurements, the final quotation will be shared with you
          along with an online payment link.
        </p>
        <h4 className="font-semibold">Ways to pay</h4>
        <p>Debit/Credit card, Tabby & Tamara.</p>
      </div>
    </div>
  );
};

export default CustomerService;
