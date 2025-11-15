"use client";
import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import ApolloCustomClient from "@utils/apollo-client";
import { usePathname } from "next/navigation";
import Header from "./Layout/Header/Header";
import Footer from "./footer/Footer";
import { ReviewsSection } from "./common";

const PathnameWrapper = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const withoutHeaderPages = ["/superAdminlogin", "/dashboard"];
  return (
      <ApolloProvider client={ApolloCustomClient}>
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
  );
};

export default PathnameWrapper;
