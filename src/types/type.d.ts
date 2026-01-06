import { Product } from "@/types/category";
import { FabricPrice } from "./category";

export interface FormData {
  inquiryType: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface FormProps {
  values: { width: string; drop: string; unit: string };
  recessType: string;
  finalPrice: FabricPrice | null;
  optionSections: Array<{
    title: string;
    helpContent?: React.ReactNode;
    options: Array<{ code: string; label: string; price: number }>;
  }>;
  productList: Product;
}

export interface ContactData {
  heading: string;
  paragraph: string;
  points?: string;
  para?: string;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  rowKey: keyof T;
  emptyMessage?: string;
  rowSelection?: {
    selectedRowKeys: React.Key[];
    onChange: (_newSelectedRowKeys: React.Key[]) => void;
  };
}
interface Column<T> {
  title: string;
  key: string;
  render?: (_record: T) => React.ReactNode;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqCategory {
  id: string;
  title: string;
  icon: React.ElementType;
  items: FaqItem[];
}
export interface AccordionItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}

export interface CartOption {
  id: string;
  title: string;
  features: string[];
  price: string;
}

export interface SelectOptionProps {
  selected: string;
  setSelected: (_value: string) => void;
  className?: string;
  CartOptions: CartOption[];
}

export interface ITabbyList {
  id: number;
  para: string;
}
export interface ITabbyPayList {
  id: number;
  imageUrl: StaticImageData;
}

export interface ITamaraList {
  id: number;
  title?: string;
  para: string;
}
