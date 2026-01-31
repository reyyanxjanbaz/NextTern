/**
 * Auth Context
 * 
 * Provides authentication state and methods throughout the app.
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api, User } from '../services/api';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, role?: 'STUDENT' | 'RECRUITER') => Promise<{ success: boolean; error?: string }>;
  demoLogin: (email: string, role?: 'STUDENT' | 'RECRUITER') => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  selectRole: (role: 'STUDENT' | 'RECRUITER') => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = '@nexttern_token';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load stored token on mount
  useEffect(() => {
    loadStoredAuth();
  }, []);

  const loadStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
      if (storedToken) {
        api.setToken(storedToken);
        const { user } = await api.getCurrentUser();
        setUser(user);
      }
    } catch (error) {
      console.log('[Auth] No valid stored session');
      await AsyncStorage.removeItem(TOKEN_KEY);
      api.setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, role?: 'STUDENT' | 'RECRUITER') => {
    try {
      const response = await api.requestMagicLink(email, role);
      return { success: true, devToken: response.devToken };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const demoLogin = async (email: string, role: 'STUDENT' | 'RECRUITER' = 'STUDENT') => {
    try {
      const response = await api.demoLogin(email, role);
      if (response.token) {
        await AsyncStorage.setItem(TOKEN_KEY, response.token);
        setUser(response.user);
        return { success: true };
      }
      return { success: false, error: 'No token received' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const logout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.log('[Auth] Logout error:', error);
    } finally {
      await AsyncStorage.removeItem(TOKEN_KEY);
      api.setToken(null);
      setUser(null);
    }
  };

  const selectRole = async (role: 'STUDENT' | 'RECRUITER') => {
    try {
      const response = await api.selectRole(role);
      if (response.success) {
        setUser(response.user);
        return { success: true };
      }
      return { success: false, error: 'Failed to select role' };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        demoLogin,
        logout,
        selectRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
