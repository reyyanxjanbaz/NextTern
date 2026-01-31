import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StatusBar } from 'react-native';
import { styled } from 'nativewind';
import { Layout, Search, CheckCircle, Clock, ArrowRight, Zap } from 'lucide-react-native';
import { isMockMode } from '../services/api';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

interface HomeScreenProps {
  onNavigate: (screen: string) => void;
}

export default function HomeScreen({ onNavigate }: HomeScreenProps) {
  return (
    <StyledView className="flex-1 bg-eggshell">
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        {/* Mock Mode Banner */}
        {isMockMode() && (
          <StyledView className="bg-yellow-100 px-4 py-2 flex-row items-center justify-center">
            <Zap color="#CA8A04" size={14} />
            <StyledText className="text-yellow-700 text-xs font-medium ml-1">
              Mock Mode - Testing without backend
            </StyledText>
          </StyledView>
        )}
        
        {/* Header */}
        <StyledView className="flex-row justify-between items-center px-6 py-4 mt-2">
          <StyledText className="text-2xl font-bold text-deepBlue">NextTern</StyledText>
          <StyledTouchableOpacity 
            onPress={() => onNavigate('Login')}
            className="bg-deepBlue px-5 py-2 rounded-full"
          >
            <StyledText className="text-white font-semibold">Log in</StyledText>
          </StyledTouchableOpacity>
        </StyledView>

        {/* Hero Section */}
        <StyledView className="px-6 pt-10 pb-12 relative overflow-hidden">
          {/* Abstract Blobs (Approximation) */}
          <StyledView className="absolute top-0 right-[-50] w-64 h-64 bg-blue-100/50 rounded-full blur-3xl" />
          <StyledView className="absolute bottom-[-50] left-[-50] w-64 h-64 bg-slate-200/50 rounded-full blur-3xl" />

          <StyledText className="text-4xl font-bold text-deepBlue leading-tight mb-4">
            Review humans, {'\n'}
            <StyledText className="text-slateBlue">not resumes.</StyledText>
          </StyledText>
          
          <StyledText className="text-lg text-steelGray mb-8 leading-relaxed">
            Experience a hiring process designed for clarity. Intent-driven, transparent, and card-based.
          </StyledText>

          <StyledView className="gap-4">
            <StyledTouchableOpacity 
              onPress={() => onNavigate('Login')}
              className="bg-deepBlue w-full py-4 rounded-full flex-row justify-center items-center shadow-lg shadow-blue-900/10"
            >
              <StyledText className="text-white font-semibold text-lg mr-2">Find Internships</StyledText>
              <ArrowRight size={20} color="white" />
            </StyledTouchableOpacity>
            
            <StyledTouchableOpacity 
              onPress={() => onNavigate('Login')}
              className="bg-white border-2 border-gray-200 w-full py-4 rounded-full flex-row justify-center items-center"
            >
              <StyledText className="text-deepBlue font-semibold text-lg">Find Talent</StyledText>
            </StyledTouchableOpacity>
          </StyledView>
        </StyledView>

        {/* Feature Section */}
        <StyledView className="px-6 py-10 bg-white rounded-t-3xl border-t border-slate-100">
          <StyledText className="text-deepBlue text-2xl font-bold mb-2">Anxiety is a UX Bug</StyledText>
          <StyledText className="text-steelGray text-base mb-8">
            We redesigned the entire hiring workflow to respect your time.
          </StyledText>

          <StyledView className="gap-6">
            <FeatureCard 
              icon={<Layout size={24} color="white" />} 
              title="Structured Identity" 
              desc="Build your profile card once." 
            />
            <FeatureCard 
              icon={<CheckCircle size={24} color="white" />} 
              title="Proof Over Claims" 
              desc="Showcase real projects, not keywords." 
            />
            <FeatureCard 
              icon={<Search size={24} color="white" />} 
              title="Intent Matching" 
              desc="Mutual interest swiping only." 
            />
            <FeatureCard 
              icon={<Clock size={24} color="white" />} 
              title="Radical Transparency" 
              desc="Real-time status updates always." 
            />
          </StyledView>
        </StyledView>
      </ScrollView>
    </StyledView>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <StyledView className="p-6 rounded-2xl bg-eggshell border border-slate-100">
      <StyledView className="w-12 h-12 rounded-xl bg-deepBlue items-center justify-center mb-4">
        {icon}
      </StyledView>
      <StyledText className="text-xl font-bold text-deepBlue mb-2">{title}</StyledText>
      <StyledText className="text-steelGray leading-relaxed">{desc}</StyledText>
    </StyledView>
  );
}
