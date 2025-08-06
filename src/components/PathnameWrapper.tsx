"use client"
import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import ApoloClient from 'utils/AppoloClient';


const PathnameWrapper = ({ children }: { children: ReactNode }) => {
  return (

        <ApolloProvider client={ApoloClient}>

          {children}

        </ApolloProvider>

  );
};

export default PathnameWrapper;