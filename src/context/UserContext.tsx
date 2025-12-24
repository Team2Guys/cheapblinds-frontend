"use client";

import { Toaster } from "@components/ui";
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface AuthUser {
  id: string;
  name: string;
  email: string;
  __typename?: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (_data: AuthUser) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

const GRAPHQL_ENDPOINT = "/graphql";

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("AuthUser");
      if (stored) setUser(JSON.parse(stored));
    } catch {
      localStorage.removeItem("AuthUser");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (_data: AuthUser) => {
    setUser(_data);
    localStorage.setItem("AuthUser", JSON.stringify(_data));
  };

  const logout = async () => {
    try {
      await fetch(GRAPHQL_ENDPOINT, {
        method: "POST",
        credentials: "include", // cookie auth
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: `mutation { signout { status message } }`,
        }),
      });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        Toaster("error", err.message);
      } else {
        console.error("Unknown error", err);
        Toaster("error", "An unexpected error occurred");
      }
    } finally {
      setUser(null);
      localStorage.removeItem("AuthUser");
      window.location.href = "/";
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
