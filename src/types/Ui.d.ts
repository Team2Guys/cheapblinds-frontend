export interface AccordionProps {
  title: string;
  sectionKey: SectionKeys;
  openSections: Record<SectionKeys, boolean>;
  toggleSection: (_key: SectionKeys) => void;
  refObj: RefObject<HTMLDivElement | null>;
  children: ReactNode;
}
