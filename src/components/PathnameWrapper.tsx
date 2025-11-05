"use client";
import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import ApoloClient from "@utils/AppoloClient";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import Header from "./Layout/Header/Header";
import Footer from "./footer/Footer";
import { ReviewsSection } from "./common";

const PathnameWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const withoutHeaderPages = [
    "/login",
    "/register",
    "/superAdminlogin",
    "/forgot-password",
    "/dashboard",
  ];
  return (
    <SessionProvider>
      <ApolloProvider client={ApoloClient}>
        {withoutHeaderPages.includes(pathname) ||
        pathname.split("/").includes("dashboard") ? null : (
          <>
            <Header />
            <ReviewsSection />
          </>
        )}
        {children}
        {pathname !== "/" &&
        (withoutHeaderPages.includes(pathname) ||
          pathname.split("/").includes("dashboard")) ? null : (
          <Footer />
        )}
      </ApolloProvider>
    </SessionProvider>
  );
};

export default PathnameWrapper;
