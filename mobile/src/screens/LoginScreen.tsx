import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { styled } from 'nativewind';
import { ArrowLeft } from 'lucide-react-native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface LoginScreenProps {
  onNavigate: (screen: string) => void;
  onLoginSuccess: () => void;
}

export default function LoginScreen({ onNavigate, onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  // Hardcode "test" login for demo purposes to skip email loop in simulator
  const handleLogin = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }
    
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
        setLoading(false);
        if (email.toLowerCase().includes('student')) {
            onLoginSuccess(); // Auto login for demo
        } else {
            setSent(true);
        }
    }, 1500);
  };

  if (sent) {
    return (
      <StyledView className="flex-1 bg-eggshell items-center justify-center px-8">
        <StyledText className="text-2xl font-bold text-deepBlue mb-4 text-center">Check your email</StyledText>
        <StyledText className="text-steelGray text-center mb-8">
          We've sent a magic link to {email}. Click the link to sign in.
        </StyledText>
        <StyledTouchableOpacity onPress={() => setSent(false)}>
          <StyledText className="text-deepBlue font-semibold">Try another email</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    );
  }

  return (
    <StyledView className="flex-1 bg-eggshell px-6 pt-12">
      <StyledTouchableOpacity onPress={() => onNavigate('Home')} className="mb-8">
        <ArrowLeft color="#0F172A" size={24} />
      </StyledTouchableOpacity>

      <StyledText className="text-3xl font-bold text-deepBlue mb-2">Welcome back</StyledText>
      <StyledText className="text-steelGray mb-8">Enter your email to sign in.</StyledText>

      <StyledView className="mb-6">
        <StyledText className="text-sm font-medium text-slateBlue mb-2">Email address</StyledText>
        <StyledTextInput
          className="bg-white border border-gray-300 rounded-lg px-4 py-3 text-deepBlue"
          placeholder="you@example.com"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
      </StyledView>

      <StyledTouchableOpacity
        onPress={handleLogin}
        disabled={loading}
        className="bg-deepBlue py-4 rounded-xl items-center justify-center shadow-md"
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <StyledText className="text-white font-semibold text-lg">Continue</StyledText>
        )}
      </StyledTouchableOpacity>

      <StyledText className="text-center text-gray-400 mt-6 text-xs">
        tip: enter 'student' to simulate instant login
      </StyledText>
    </StyledView>
  );
}
