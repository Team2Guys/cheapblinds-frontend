import React from "react";

const CookiePolicy = () => {
  return (
    <div className="container mx-auto px-2 space-y-5 my-10">
      <h1 className="text-heading">Cookie Policy</h1>
      <p>
        CheapBlinds and our partners use cookies to manage performance, advertising and customer
        experience. By continuing, you agree to our use of cookies. Please review our Privacy Policy
        to learn about managing cookies.
      </p>
      <p>
        We use cookies when you visit our Site to analyse traffic, optimize performance and content
        and to provide an integrated and more personalized shopping experience for customers.
      </p>
      <div className="space-y-3">
        <h2 className="text-medium">Cookies Used By Us</h2>
        <p>We generally use the following types of cookies:</p>
        <ul className="list-disc px-6">
          <li>Functionality cookies that help provide a seamless online shopping experience</li>
          <li>
            Analytics cookies that help us measure, analyse and understand how our customers use the
            Site and to identify ways to improve both its functionality and your shopping
            experience.
          </li>
          <li>
            Once you have found an item, select its attributes and click on &apos;ADD TO BASKET:
          </li>
          <li>
            Click on your basket to review the products selected. Items can be removed from the
            basket by clicking the cross next to them. Or you can change the quantity by typing the
            correct quantity and clicking &apos;update basket. To continue shopping just click on
            &apos;continue shopping&apos;.
          </li>
          <li>Click on &apos;Proceed to Checkout to proceed with your order and pay.</li>
        </ul>
      </div>
      <div className="space-y-3">
        <h2 className="text-medium">Placing an order online</h2>
        <p>
          Browse our website and place your order using the following easy-to-follow instructions:
        </p>
        <ul className="list-disc px-6">
          <li>
            Whatever device you are using, our site has been optimized to give you the best possible
            experience.
          </li>
          <li>
            Use our handy navigation links to browse by product category, or if you know exactly
            what you&apos;re after search using the search box.
          </li>
          <li>
            Once you have found an item, select its attributes and click on &apos;ADD TO BASKET:
          </li>
          <li>
            Click on your basket to review the products selected. Items can be removed from the
            basket by clicking the cross next to them. Or you can change the quantity by typing the
            correct quantity and clicking &apos;update basket. To continue shopping just click on
            &apos;continue shopping&apos;.
          </li>
          <li>Click on &apos;Proceed to Checkout to proceed with your order and pay.</li>
        </ul>
      </div>
    </div>
  );
};

export default CookiePolicy;
