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
