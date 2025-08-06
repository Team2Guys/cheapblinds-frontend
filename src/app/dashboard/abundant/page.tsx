import { fetchOrders } from "config/fetch";
import Order from "./Order";
import { Order as ProdOrder } from "types/prod";




const Abandoned= async () => {
  const ordersData = await fetchOrders();
  const abandonedOrder = ordersData
  .filter(
    (item: ProdOrder) => item.paymentStatus === false && item.checkout === true
  )
  .sort(
    (a: ProdOrder, b: ProdOrder) => new Date(b.checkoutDate).getTime() - new Date(a.checkoutDate).getTime()
  );
  return <Order title="Abandoned Order" ordersData={abandonedOrder} />
};

export default Abandoned;
