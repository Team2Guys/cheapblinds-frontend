"use client";

import { Toaster } from "@components/ui";
import { jwtDecode } from "jwt-decode";
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface User {
  id: string;
  accessToken: string;
  __typename?: string;
}

interface Admin {
  id: string;
  accessToken: string;
  role: string;
  __typename?: string;
}

interface AuthContextType {
  // User
  user: User | null;
  loginUser: (_userData: User) => void;
  logoutUser: () => void;
  isUserAuthenticated: boolean;

  // Admin
  admin: Admin | null;
  loginAdmin: (_adminData: Admin) => void;
  logoutAdmin: () => void;
  isAdminAuthenticated: boolean;
  role: string | null;

  // Shared
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Utility to check if token is expired
const isTokenExpired = (token: string) => {
  try {
    const decoded: { exp: number } = jwtDecode(token.replace("Bearer ", ""));
    const currentTime = Date.now() / 1000; // current time in seconds
    return decoded.exp < currentTime;
  } catch (err) {
    console.error("Invalid token:", err);
    return true; // treat invalid token as expired
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [admin, setAdmin] = useState<Admin | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load tokens from localStorage
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("UserToken");
      const storedAdmin = localStorage.getItem("AdminToken");

      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedAdmin) setAdmin(JSON.parse(storedAdmin));
    } catch (err) {
      console.error("Error loading tokens:", err);
      localStorage.removeItem("UserToken");
      localStorage.removeItem("AdminToken");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Auto logout if JWT expired
  useEffect(() => {
    const checkTokenExpiry = () => {
      if (admin?.accessToken && isTokenExpired(admin.accessToken)) {
        logoutAdmin();
        Toaster( "error","Admin session expired. Please login again.");
      }
      if (user?.accessToken && isTokenExpired(user.accessToken)) {
        logoutUser();
        Toaster( "error","User session expired. Please login again.");
      }
    };

    // Check immediately and every 30 seconds
    checkTokenExpiry();
    const interval = setInterval(checkTokenExpiry, 30000);
    return () => clearInterval(interval);
  }, [admin, user]);

  // USER LOGIN
  const loginUser = (userData: User) => {
    const tokenWithBearer = {
      ...userData,
      accessToken: `Bearer ${userData.accessToken}`,
    };
    setUser(tokenWithBearer);
    localStorage.setItem("UserToken", JSON.stringify(tokenWithBearer));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("UserToken");
    window.location.href = "/";
  };

  // ADMIN LOGIN
  const loginAdmin = (adminData: Admin) => {
    const tokenWithBearer = {
      ...adminData,
      accessToken: `Bearer ${adminData.accessToken}`,
    };
    setAdmin(tokenWithBearer);
    localStorage.setItem("AdminToken", JSON.stringify(tokenWithBearer));
  };

  const logoutAdmin = () => {
    setAdmin(null);
    localStorage.removeItem("AdminToken");
    window.location.href = "/dashboard/Admin-login";
  };

  const value: AuthContextType = {
    // User
    user,
    loginUser,
    logoutUser,
    isUserAuthenticated: !!user,

    // Admin
    admin,
    loginAdmin,
    logoutAdmin,
    isAdminAuthenticated: !!admin,
    role: admin?.role || null,

    // Common
    isLoading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook to use auth
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
