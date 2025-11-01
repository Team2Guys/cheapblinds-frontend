import { Session, SessionStrategy, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Permissions } from "@/types/type";
import { AuthOptions } from "next-auth";
import ApoloClient from "@utils/AppoloClient";
import { ADMIN_LOGIN, super_admin_ADMIN_LOGIN } from "@/graphql/Admins";

type CustomUser = User &
  Permissions & {
    id: string; // MUST be string to match NextAuth types
    name: string;
    email: string;
    posterImageUrl?: {
      imageUrl: string;
      public_id?: string;
    };
    public?: string | null;
  };

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        IsAdmin: { label: "IsAdmin", type: "text" },
      },
      async authorize(credentials) {
        const isAdmin = credentials?.IsAdmin === "true";
        const key = isAdmin ? "adminLogin" : "superAdminLogin";

        try {
          const { data } = await ApoloClient.mutate({
            mutation: isAdmin ? ADMIN_LOGIN : super_admin_ADMIN_LOGIN,
            variables: {
              email: credentials?.email,
              password: credentials?.password,
            },
          });

          if (!data || !data[key]) {
            // 👇 throw an error with your custom message
            throw new Error("Invalid email or password");
          }

          const adminData = data?.[key];
          return adminData
            ? ({
                ...adminData,
                id: String(adminData.id), // Ensure it's a string
              } as CustomUser)
            : null;
          //eslint-disable-next-line
        } catch (error: any) {
          console.log(error?.networkError?.result, "Login failed");
          throw new Error(error.message || "Login failed");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user && "id" in user) {
        const { id, email, name, posterImageUrl, ...permissions } = user as CustomUser;

        return {
          ...token,
          id,
          email,
          name,
          picture: posterImageUrl?.imageUrl ?? null,
          public: posterImageUrl?.public_id ?? null,
          ...permissions,
        };
      }

      return token;
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      const {
        id,
        email,
        name,
        picture,
        public: public_id,
        token: accessToken,
        ...permissions
      } = token;

      session.user = {
        ...(session.user ?? {}),
        id: id ?? "",
        email: email ?? "",
        name: name ?? "",
        image: picture ?? null,
        public: public_id ?? null,
        ...permissions,
      };
      //@ts-expect-error("expected ")
      session.accessToken = accessToken;
      return session;
    },
  },
  session: {
    strategy: "jwt" as SessionStrategy,
    maxAge: 20 * 60, // 5 minutes
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
};
