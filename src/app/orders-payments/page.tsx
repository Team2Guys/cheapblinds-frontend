import Link from "next/link";
import React from "react";
import { generateMetadata } from "@utils/seoMetadata";
import { metaData } from "@data/meta-data";
export const metadata = generateMetadata(metaData.orders_payments);

const OrdersPayments = () => {
  return (
    <div className="container mx-auto px-2 space-y-5 my-10">
      <h1 className="text-heading">Orders & Payments</h1>
      <div className="space-y-3">
        <h2 className="text-medium">Placing an order online</h2>
        <p>Browse our website and place your order using these easy-to-follow instructions:</p>
        <ul className="list-disc px-6">
          <li>
            Use our handy navigation links to browse by product category. Alternatively, if you know
            exactly what you’re looking for, use the search box.
          </li>
          <li>
            Once you have found an item, select the required attributes (e.g., size, colour) and
            click on ‘ADD TO BASKET’.
          </li>
          <li>
            Once you have found an item, select its attributes and click on &apos;ADD TO BASKET:
          </li>
          <li>
            Review Your Basket: Click on your basket to review the selected products. Items can be
            removed by clicking the cross icon next to them. You can also change the quantity by
            typing the correct amount and clicking ‘Update Basket’. To continue browsing, simply
            click on ‘Continue Shopping’.
          </li>
          <li>Click on ‘Proceed to Checkout’ to finalise your order and payment.</li>
        </ul>
      </div>

      <div className="space-y-3">
        <h2 className="text-medium">Placed an order – What happens next?</h2>
        <p>
          Once your order is placed, you’ll receive an order confirmation via email and SMS
          containing your order number and the details of the items or services purchased. Please
          review this confirmation carefully and contact our customer service team via our website
          if you have any questions.
        </p>
        <ul className="list-disc px-6">
          <li>
            Your made-to-measure blinds and accessories will be produced, dispatched, and delivered
            within 4 working days, depending on the items ordered. For more information about our
            delivery services, please visit our{" "}
            <Link className="underline text-primary" href="/delivery-policy/">
              Delivery Page
            </Link>
            .
          </li>
        </ul>
        <p>
          <strong>Payment Options:</strong> We accept most major credit cards, and also offer buy
          now, pay later options through Tabby and Tamara.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-medium">Order delays and out of stock orders</h2>
        <p>We work hard to ensure our offered ranges are fully up to date and available.</p>
        <p>
          On the rare occasion something is unavailable, we will contact you right away and offer an
          alternative or refund your payment asap.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-medium">Cancelling and amending orders</h2>
        <p>
          <strong>Cancelling your order:</strong> As everything is custom made to your precise
          specifications, once an order goes into production, we cannot offer cancellations.
          However, if you have noticed an error or have a change of mind, please call us immediately
          as it might be possible to stop the order from starting manufacturing. Our aim is to be as
          helpful as possible, so where we can, we will definitely be there for you.
        </p>
        <p>
          <strong>Changing delivery information:</strong> If for any reason you need to change the
          delivery address or contact details, just call, whatsapp or drop us an email with the
          updated details
        </p>
        <p>
          <strong>Adding items to your order:</strong> You can either place a new order or contact
          us to update from our end.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-medium">Returns and refunds</h2>
        <p>
          For full details of our returns and refunds policy please check our{" "}
          <Link className="text-primary underline" href="/returns-refunds">
            Returns & Refunds Policy.
          </Link>
        </p>
      </div>
      <div className="space-y-3">
        <h2 className="text-medium">Order history</h2>
        <p>
          Simply log in to your{" "}
          <Link className="text-primary underline" href="/account">
            online account
          </Link>{" "}
          to view your order history.
        </p>
      </div>
    </div>
  );
};

export default React.memo(OrdersPayments);
