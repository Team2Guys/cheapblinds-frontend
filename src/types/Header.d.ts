export interface DropdownPanelProps {
  icon: React.ReactNode;
  title: string;
  badgeCount?: number;
  items: {
    name: string;
    image: string;
    price?: string;
    requiredBoxes?: number; 
  }[];
  viewLink?: string;
  emptyMessage?: string;
}

export interface SocialLink {
    id: number;
    href: string;
    Icon: IconType;
}

export interface SubmenuItem {
  name: string;
  link: string;
  image: string;
}

export interface MenuItem {
  name: string;
  link?: string;
  icon?: IconType;
  submenu?: SubmenuItem[];
}