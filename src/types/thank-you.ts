export interface OrderItem {
  image: string;
  title: string;
  quantity: number;
  price: number;
}

export interface ThankYouProps {
  orderItems: OrderItem[];
}
