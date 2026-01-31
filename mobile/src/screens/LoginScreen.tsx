import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { styled } from 'nativewind';
import { Mail, Zap } from 'lucide-react-native';
import { api, isMockMode } from '../services/api';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTextInput = styled(TextInput);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface LoginScreenProps {
  onLoginSuccess: (user: any, token: string) => void;
}

type LoginStep = 'email' | 'sent' | 'role';

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<LoginStep>('email');
  const [selectedRole, setSelectedRole] = useState<'STUDENT' | 'RECRUITER' | null>(null);

  const handleRequestMagicLink = async () => {
    if (!email) {
      Alert.alert('Error', 'Please enter your email');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) && !email.toLowerCase().includes('student') && !email.toLowerCase().includes('recruiter')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setLoading(true);

    try {
      // Demo login shortcut for testing
      if (email.toLowerCase().includes('student') || email.toLowerCase().includes('recruiter')) {
        const role = email.toLowerCase().includes('recruiter') ? 'RECRUITER' : 'STUDENT';
        const demoEmail = `${email.replace(/[^a-zA-Z0-9]/g, '')}@demo.nexttern.com`;
        
        const response = await api.demoLogin(demoEmail, role);
        if (response.success && response.token) {
          onLoginSuccess(response.user, response.token);
          return;
        }
      }

      // Regular magic link flow
      const response = await api.requestMagicLink(email, selectedRole || undefined);
      if (response.success) {
        setStep('sent');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Failed to send magic link. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectRole = (role: 'STUDENT' | 'RECRUITER') => {
    setSelectedRole(role);
  };

  // Email sent confirmation
  if (step === 'sent') {
    return (
      <StyledView className="flex-1 bg-eggshell items-center justify-center px-8">
        <StyledView className="w-20 h-20 bg-pastelGreenLight rounded-full items-center justify-center mb-6">
          <Mail color="#81C784" size={40} />
        </StyledView>
        <StyledText className="text-2xl font-bold text-deepBlue mb-4 text-center">
          Check your email
        </StyledText>
        <StyledText className="text-steelGray text-center mb-8 leading-relaxed">
          We've sent a magic link to{'\n'}
          <StyledText className="font-semibold text-deepBlue">{email}</StyledText>
          {'\n'}Click the link to sign in.
        </StyledText>
        <StyledTouchableOpacity 
          onPress={() => setStep('email')}
          className="py-3 px-6"
        >
          <StyledText className="text-pastelGreenDark font-semibold">Try another email</StyledText>
        </StyledTouchableOpacity>
      </StyledView>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <StyledView className="flex-1 bg-eggshell px-6 pt-16">
        {/* Logo and Tagline */}
        <StyledView className="items-center mb-10">
          <StyledText className="text-4xl font-bold text-deepBlue mb-2">NextTern</StyledText>
          <StyledText className="text-lg text-steelGray italic">Reviews humans not resumes</StyledText>
        </StyledView>

        <StyledText className="text-2xl font-bold text-deepBlue mb-2">
          Welcome
        </StyledText>
        <StyledText className="text-steelGray mb-8">
          Enter your email to sign in or create an account.
        </StyledText>

        {/* Role Selection */}
        <StyledView className="mb-6">
          <StyledText className="text-sm font-medium text-slateBlue mb-3">I am a...</StyledText>
          <StyledView className="flex-row gap-3">
            <StyledTouchableOpacity
              onPress={() => handleSelectRole('STUDENT')}
              className={`flex-1 py-4 rounded-xl border-2 items-center ${
                selectedRole === 'STUDENT' 
                  ? 'bg-pastelGreen border-pastelGreen' 
                  : 'bg-white border-softGray'
              }`}
            >
              <StyledText className={`font-semibold ${
                selectedRole === 'STUDENT' ? 'text-white' : 'text-deepBlue'
              }`}>
                Student
              </StyledText>
            </StyledTouchableOpacity>
            <StyledTouchableOpacity
              onPress={() => handleSelectRole('RECRUITER')}
              className={`flex-1 py-4 rounded-xl border-2 items-center ${
                selectedRole === 'RECRUITER' 
                  ? 'bg-pastelGreen border-pastelGreen' 
                  : 'bg-white border-softGray'
              }`}
            >
              <StyledText className={`font-semibold ${
                selectedRole === 'RECRUITER' ? 'text-white' : 'text-deepBlue'
              }`}>
                Recruiter
              </StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>

        {/* Email Input */}
        <StyledView className="mb-6">
          <StyledText className="text-sm font-medium text-slateBlue mb-2">Email address</StyledText>
          <StyledTextInput
            className="bg-white border border-softGray rounded-xl px-4 py-4 text-deepBlue text-base"
            placeholder="you@example.com"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            autoComplete="email"
            editable={!loading}
          />
        </StyledView>

        <StyledTouchableOpacity
          onPress={handleRequestMagicLink}
          disabled={loading}
          className={`py-4 rounded-xl items-center justify-center shadow-md ${
            loading ? 'bg-gray-400' : 'bg-pastelGreen'
          }`}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <StyledText className="text-white font-semibold text-lg">Continue</StyledText>
          )}
        </StyledTouchableOpacity>

        <StyledView className="mt-8 p-4 bg-pastelGreenLight rounded-xl">
          <StyledText className="text-center text-slateBlue text-sm leading-relaxed">
            <StyledText className="font-semibold">Demo tip:</StyledText> Type "student" or "recruiter" to instantly log in for testing.
          </StyledText>
        </StyledView>

        {isMockMode() && (
          <StyledView className="mt-4 p-3 bg-yellow-100 rounded-xl flex-row items-center justify-center">
            <Zap color="#CA8A04" size={16} />
            <StyledText className="text-yellow-700 text-sm font-medium ml-2">
              Mock Mode Active - No server needed
            </StyledText>
          </StyledView>
        )}
      </StyledView>
    </KeyboardAvoidingView>
  );
}
