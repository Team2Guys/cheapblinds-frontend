"use client"
import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import ApoloClient from 'utils/AppoloClient';
import { SessionProvider } from 'next-auth/react';
import '@ant-design/v5-patch-for-react-19';
import { usePathname } from 'next/navigation';
import Header from './Layout/Header/Header';
import Footer from './footer/Footer';


const PathnameWrapper = ({ children }: { children: ReactNode }) => {
   const pathname = usePathname();
  const withoutHeaderPages = [
    "/login",
    '/register',
    "/superAdminlogin",
    "/forgot-password",
    "/dashboard",

  ]
  return (
    <SessionProvider>
      <ApolloProvider client={ApoloClient}>
   {
      withoutHeaderPages.includes(pathname)  || pathname.split('/').includes('dashboard') ? null : 
      <Header/>
      }
      {children}
      {pathname !=="/" && (withoutHeaderPages.includes(pathname) || pathname.split('/').includes('dashboard')) ? null  : 
      <Footer /> 
      }
      </ApolloProvider>
    </SessionProvider>

  );
};

export default PathnameWrapper;