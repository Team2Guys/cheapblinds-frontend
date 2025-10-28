import { DefaultSession } from "next-auth";
import { Permissions } from "./types/permissions";

declare module "next-auth" {
  export interface Session {
    user: {
      id: number;
      email: string;
      name: string;
      image?: string | null;
      public?: string | null;
    } & Permissions &
      DefaultSession["user"];
    accessToken?: string;
  }

  interface User extends Permissions {
    id: number;
    email: string;
    name: string;
    posterImageUrl?: {
      imageUrl: string;
      public_id?: string;
    };
    public?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends Permissions {
    id?: number;
    email?: string;
    name?: string;
    accessToken?: string; // Add accessToken to JWT type
    picture?: string | null;
    public?: string | null;
  }
}
