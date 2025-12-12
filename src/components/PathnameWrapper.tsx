"use client";
import { ReactNode } from "react";
import { ApolloProvider } from "@apollo/client";
import ApolloCustomClient from "@utils/apollo-client";
import Header from "./Layout/Header/Header";
import Footer from "./footer/Footer";
import { ReviewsSection } from "./common";
import { AuthProvider } from "@context/UserContext";
import { IndexedDbProvider } from "@lib/useIndexedDb";

interface Props {
  children: ReactNode;
}

const PathnameWrapper = ({ children }: Props) => {
  return (
    <AuthProvider>
      <IndexedDbProvider>
        <ApolloProvider client={ApolloCustomClient}>
          <Header />
          <ReviewsSection />
          {children}
          <Footer />
        </ApolloProvider>
      </IndexedDbProvider>
    </AuthProvider>
  );
};

export default PathnameWrapper;
