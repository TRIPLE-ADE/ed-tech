"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Models } from "appwrite";

import { authService } from "@/features/auth/services/auth-service";
import { AuthLoadingKey } from "../types/auth.types";

interface AuthContextType {
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  loadingMap: Record<AuthLoadingKey, boolean>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuthState: () => Promise<void>;
  googleOAuth: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(
    null
  );
  const [loadingMap, setLoadingMap] = useState<Record<AuthLoadingKey, boolean>>(
    {
      initial: false,
      login: false,
      register: false,
      logout: false,
      googleOAuth: false,
    }
  );

  const setLoading = (key: AuthLoadingKey, value: boolean) => {
    setLoadingMap((prev) => ({ ...prev, [key]: value }));
  };

  const loading = Object.values(loadingMap).some((value) => value);

  useEffect(() => {
    checkAuthState();
  }, []);

  const checkAuthState = async () => {
    setLoading("initial", true);
    try {
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch {
      setUser(null);
    } finally {
      setLoading("initial", false);
    }
  };

  const login = async (email: string, password: string) => {
    setLoading("login", true);
    try {
      await authService.login({ email, password });
      const currentUser = await authService.getCurrentUser();
      setUser(currentUser);
    } catch (err: any) {
      throw err;
    } finally {
      setLoading("login", false);
    }
  };

  const register = async (email: string, password: string, name: string) => {
    setLoading("register", true);
    try {
      const newUser = await authService.createAccount({
        email,
        password,
        name,
      });
      setUser(newUser);
    } catch (err: any) {
      throw err;
    } finally {
      setLoading("register", false);
    }
  };

  const logout = async () => {
    setLoading("logout", true);
    try {
      await authService.logout();
      setUser(null);
    } catch (err: any) {
      throw err;
    } finally {
      setLoading("logout", false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await authService.resetPassword(email);
    } catch (error) {
      throw error;
    }
  };

  const googleOAuth = async () => {
    setLoading("googleOAuth", true);
    try {
      await authService.googleOAuth();
    } catch (err: any) {
      throw err;
    }
  };

  const value: AuthContextType = {
    user,
    loading,
    loadingMap,
    login,
    googleOAuth,
    checkAuthState: checkAuthState,
    register,
    logout,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
