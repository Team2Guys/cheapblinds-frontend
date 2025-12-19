import { Metadata } from "next";
import logo from "../../public/assets/images/navbar/logo.png";
import { headers } from "next/headers";

type MetaInput = {
  title?: string | null;
  description?: string | null;
  canonicalTag?: string | null;
  imageUrl?: string | null;
  imageAlt?: string | null;
  fallbackPath?: string;
};

interface MetadataProps {
  title: string;
  description: string;
  path?: string;
  type?: "website" | "article";
  canonical?: string;
  isHome?: boolean;
}
export function generateMetadata({
  title,
  description,
  path = "/",
  type = "website",
  canonical,
  isHome = false,
}: MetadataProps): Metadata {
  const baseUrl = "https://cheapblinds.ae";
  const fullUrl = isHome ? baseUrl : `${baseUrl}${path}`;

  return {
    ...(isHome && { metadataBase: new URL(baseUrl) }),
    title,
    description,
    openGraph: {
      title,
      description,
      url: fullUrl,
      images: [
        {
          url: logo.src,
          alt: title,
        },
      ],
      type,
    },
    alternates: {
      canonical: canonical || fullUrl,
    },
    robots: {
      index: false,
      follow: false,
      nocache: false,
    },
  };
}

export async function generateMeta({
  title,
  description,
  canonicalTag,
  imageUrl,
  imageAlt,
  fallbackPath = "",
}: MetaInput): Promise<Metadata> {
  const headersList = await headers();

  const domain = headersList.get("x-forwarded-host") || headersList.get("host") || "cheapblinds.ae";
  const protocol = headersList.get("x-forwarded-proto") || "https";

  const fullUrl = `${protocol}://${domain}`;

  const finalTitle = title || "Cheap Blinds UAE";
  const finalDescription = description || "Premium blinds and curtains for every room in the UAE";

  // Ensure fallbackPath ends with a slash
  if (fallbackPath && !fallbackPath.endsWith("/")) {
    fallbackPath += "/";
  }

  const canonical = canonicalTag?.startsWith("http")
    ? canonicalTag.endsWith("/")
      ? canonicalTag
      : canonicalTag + "/" // add trailing slash if missing
    : `${fullUrl}${fallbackPath}`;

  const image = [
    {
      url: imageUrl || `${fullUrl}/default-blinds.png`,
      alt: imageAlt || "Cheap Blinds UAE",
    },
  ];

  return {
    title: finalTitle,
    description: finalDescription,
    openGraph: {
      title: finalTitle,
      description: finalDescription,
      url: canonical,
      images: image,
      type: "website",
    },
    alternates: {
      canonical,
    },
  };
}
