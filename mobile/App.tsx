import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, ActivityIndicator, Text } from 'react-native';
import { styled } from 'nativewind';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import JobsScreen from './src/screens/JobsScreen';
import ChatScreen from './src/screens/ChatScreen';
import SwipeScreen from './src/screens/SwipeScreen';
import ApplicationsScreen from './src/screens/ApplicationsScreen';
import BottomNavbar, { TabName } from './src/components/BottomNavbar';
import { api } from './src/services/api';

const StyledSafeAreaView = styled(SafeAreaView);
const StyledView = styled(View);
const StyledText = styled(Text);

const TOKEN_KEY = '@nexttern_token';

interface User {
  id: string;
  email: string;
  role: 'STUDENT' | 'RECRUITER' | null;
  emailVerified?: boolean;
  onboardingComplete?: boolean;
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentTab, setCurrentTab] = useState<TabName>('Swipe');
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for stored auth on mount
  useEffect(() => {
    checkStoredAuth();
  }, []);

  const checkStoredAuth = async () => {
    try {
      const storedToken = await AsyncStorage.getItem(TOKEN_KEY);
      if (storedToken) {
        api.setToken(storedToken);
        const response = await api.getCurrentUser();
        if (response.user) {
          setUser(response.user);
          api.setCurrentUser(response.user);
          setIsAuthenticated(true);
        }
      }
    } catch (error) {
      console.log('[App] No valid stored session');
      await AsyncStorage.removeItem(TOKEN_KEY);
      api.setToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginSuccess = async (loggedInUser: User, token: string) => {
    try {
      await AsyncStorage.setItem(TOKEN_KEY, token);
      api.setToken(token);
      api.setCurrentUser(loggedInUser);
      setUser(loggedInUser);
      setIsAuthenticated(true);
      setCurrentTab('Swipe');
    } catch (error) {
      console.error('[App] Failed to save auth:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await api.logout();
    } catch (error) {
      console.log('[App] Logout API error (ignoring):', error);
    } finally {
      await AsyncStorage.removeItem(TOKEN_KEY);
      api.setToken(null);
      api.setCurrentUser(null);
      setUser(null);
      setIsAuthenticated(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <StyledSafeAreaView className="flex-1 bg-eggshell items-center justify-center">
        <ActivityIndicator size="large" color="#A8D5BA" />
        <StyledText className="mt-4 text-steelGray">Loading...</StyledText>
      </StyledSafeAreaView>
    );
  }

  // Not authenticated - show login
  if (!isAuthenticated) {
    return (
      <StyledSafeAreaView className="flex-1 bg-eggshell">
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      </StyledSafeAreaView>
    );
  }

  // Authenticated - show main app with bottom tabs
  const renderCurrentScreen = () => {
    switch (currentTab) {
      case 'Jobs':
        return <JobsScreen user={user} />;
      case 'Chat':
        return <ChatScreen user={user} />;
      case 'Swipe':
        return <SwipeScreen user={user} />;
      case 'Applications':
        return <ApplicationsScreen user={user} />;
      case 'Dashboard':
        return <DashboardScreen user={user} onLogout={handleLogout} />;
      default:
        return <SwipeScreen user={user} />;
    }
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-eggshell">
      {renderCurrentScreen()}
      <BottomNavbar currentTab={currentTab} onTabChange={setCurrentTab} />
    </StyledSafeAreaView>
  );
}
