"use client"
import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import ApoloClient from 'utils/AppoloClient';
import { SessionProvider } from 'next-auth/react';


const PathnameWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <SessionProvider>
      <ApolloProvider client={ApoloClient}>

        {children}

      </ApolloProvider>
    </SessionProvider>

  );
};

export default PathnameWrapper;