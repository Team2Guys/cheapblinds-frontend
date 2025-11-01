import { fetchOrders } from "@config/fetch";
import { Order as ProdOrder } from "@/types/prod";
import Order from "../abundant/Order";

const OrdersPage = async () => {
  const orders = await fetchOrders();
  const OrderData = orders
    .filter((item: ProdOrder) => item.paymentStatus === true && item.checkout === false)
    .sort(
      (a: ProdOrder, b: ProdOrder) =>
        new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime(),
    );
  return <Order title="Order" ordersData={OrderData} />;
};

export default OrdersPage;
