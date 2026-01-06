// utils/buildOptionSections.ts
import { OptionsPrice } from "@/types/category";
import { CATEGORY_OPTION_CONFIG } from "@data/detail-page";

export type OptionItem = {
  code: string;
  label: string;
  price: number;
};

export type OptionSection = {
  title: string;
  options: OptionItem[];
};

export const decodeHtml = (html: string) => {
  if (!html) return "";

  return html
    .replace(/&#(\d+);/g, (_match, dec) => {
      return String.fromCharCode(dec);
    })
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
};

export const formatAED = (price: number | undefined | null): string => {
  if (!price || isNaN(price)) return "0";
  return price.toLocaleString("en-AE", {
    minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  });
};

export const buildOptionSections = (
  categorySlug: keyof typeof CATEGORY_OPTION_CONFIG,
  options: OptionsPrice[],
): OptionSection[] => {
  const config = CATEGORY_OPTION_CONFIG[categorySlug];
  if (!config || !options?.length) return [];

  const normalize = (v: string) => v.trim().toLowerCase();

  return (
    Object.entries(config)
      .map(([group, allowedCodes]) => {
        const groupOptions = options
          .filter(
            (o) =>
              normalize(o.OptionGroup) === normalize(group) && allowedCodes.includes(o.ChoiceCode),
          )
          .map((o) => ({
            code: o.ChoiceCode,
            label: o.ChoiceDescription ?? "",
            price: Number(o.SalesPrice) || 0,
          }));

        return {
          title: group,
          options: groupOptions,
        };
      })
      // 🚫 remove empty groups (important)
      .filter((section) => section.options.length > 0)
  );
};
