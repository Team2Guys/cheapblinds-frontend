"use client";
import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import ApolloCustomClient from "@utils/apollo-client";
import { usePathname } from "next/navigation";
import Header from "./Layout/Header/Header";
import Footer from "./footer/Footer";
import { ReviewsSection } from "./common";
import { AuthProvider } from "@context/UserContext";

interface Props {
  children: ReactNode;
}

const PathnameWrapper = ({ children }: Props) => {
  const pathname = usePathname();
  const withoutHeaderPages = ["/superAdminlogin", "/dashboard"];

  const showHeader = !withoutHeaderPages.includes(pathname) && !pathname.startsWith("/dashboard");
  const showFooter = pathname === "/" || (!withoutHeaderPages.includes(pathname) && !pathname.startsWith("/dashboard"));

  return (
    <AuthProvider>
      <ApolloProvider client={ApolloCustomClient}>
        {showHeader && (
          <>
            <Header />
            <ReviewsSection />
          </>
        )}

        {children}

        {showFooter && <Footer />}
      </ApolloProvider>
    </AuthProvider>
  );
};

export default PathnameWrapper;
