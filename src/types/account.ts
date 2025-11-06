export interface Order {
  id: string;
  date?: string;
  shipTo: string;
  total?: string;
  items?: { name: string; qty: number; price: string }[];
}
