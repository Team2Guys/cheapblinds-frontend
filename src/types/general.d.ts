import { IEcomerece, ProductImage } from "./prod";

export interface IReview {
  id: number;
  name: string;
  ReviewsDescription: string;
  starRating?: number;
  createdAt: string;
  updatedAt?: string;
  posterImageUrl: ProductImage;
  reviewDate?: string;
}

//eslint-disable-next-line
export interface initiValuesProps
  extends Omit<IReview, "posterImageUrl" | "createdAt", "updatedAt"> {}

export interface ISOCIAL_LINKS {
  id: number;
  post_links: string;
  createdAt: string;
  posterImageUrl: ProductImage;
  updatedAt?: string;
}

//eslint-disable-next-line
export interface initialSocial
  extends Omit<ISOCIAL_LINKS, "posterImageUrl" | "createdAt", "updatedAt"> {}

export interface RedirectUrls {
  updatedAt?: string;
  createdAt?: string;
  id: number;
  url: string;
  redirectedUrl: string;
}

export interface initialRedirectUrls extends Omit<RedirectUrls, "id"> {
  redirectedUrl?: string;
  url?: string;
}

type CommentStatus = "PENDING" | "APPROVED" | "REJECTED";

export interface ProductReviews {
  id: number;
  productId: string; // Assuming this is the ID of the product being reviewed
  starRating: number;
  name: string;
  ReviewsDescription: string;
  reviewDate?: string;
  posterImageUrl?: ProductImage; // You can make this more specific if you know the structure
  productsImage?: ProductImage[]; // Same here
  status?: CommentStatus;
  EcomereceProducts?: IEcomerece;

  createdAt: string;
  updatedAt?: string;
}

export interface replyTextobject {
  replyText: string;
  commentId: number;
  status: CommentStatus;
}

export interface ProductQuestion {
  id: number;
  name: string;
  email: string;
  question: string;
  productId?: number;
  status?: CommentStatus;
  replies?: replyTextobject[];
  EcomereceProducts?: IEcomerece;
  createdAt: string;
  updatedAt?: string;
}

export type BlogStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export interface IBlog {
  id?: string;
  title: string;
  content: string;
  category: string;
  slug: string;
  posterImage?: ProductImage;
  last_editedBy?: string;
  canonicalTag?: string;
  metaDescription?: string;
  metaTitle?: string;
  redirectionUrl?: string;
  publishedAt?: Date;
  status: BlogStatus;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
  comments?: IBlogComment[];
}

export interface IBlogReply {
  id: string;
  name: string;
  Email: string;
  phone: string;
  description: string;
  createdAt: string;
  status: string;
}

export interface IBlogComment {
  id: string;
  name: string;
  Email: string;
  phone: string;
  description: string;
  createdAt: string;
  replies?: IBlogReply[];
  blogId: string;
  status: string;
  last_editedBy: string | null;
  blog: {
    id: string;
    title: string;
  };
}

export interface MONTHLYGRAPH {
  series: { name: string; data: number[] }[];
  categories: string[];
}
export interface WEEKLYGRAPH {
  series: { name: string; data: number[] }[];
  categories: string[];
}
export interface STATUS {
  date: string;
  day: string;
  Appointments: number;
  Orders: number;
}
