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
  mobileimage?: string;
  desktopimage?: string;
}

export interface MenuItem {
  name: string;
  link?: string;
  image?: string;
  submenu?: SubmenuItem[];
}

export interface DrawerProps {
  title: React.ReactNode;
  content: React.ReactNode;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  width?: number;
  className?: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}
