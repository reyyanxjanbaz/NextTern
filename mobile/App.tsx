import React, { useState } from 'react';
import { View, SafeAreaView } from 'react-native';
import { styled } from 'nativewind';
import HomeScreen from './src/screens/HomeScreen';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';

const StyledSafeAreaView = styled(SafeAreaView);

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('Home');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'Home':
        return <HomeScreen onNavigate={setCurrentScreen} />;
      case 'Login':
        return <LoginScreen onNavigate={setCurrentScreen} onLoginSuccess={() => setCurrentScreen('Dashboard')} />;
      case 'Dashboard':
        return <DashboardScreen />;
      default:
        return <HomeScreen onNavigate={setCurrentScreen} />;
    }
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-eggshell">
      {renderScreen()}
    </StyledSafeAreaView>
  );
}
