import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { styled } from 'nativewind';
import { Search, List, MessageSquare, User } from 'lucide-react-native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export default function DashboardScreen() {
  return (
    <StyledView className="flex-1 bg-gray-50">
      {/* Header */}
      <StyledView className="bg-white px-6 pt-12 pb-6 shadow-sm border-b border-gray-100 flex-row justify-between items-center">
        <View>
            <StyledText className="text-2xl font-bold text-deepBlue">Student Dashboard</StyledText>
            <StyledText className="text-steelGray text-sm">Welcome, Student</StyledText>
        </View>
        <StyledView className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
            <StyledText className="text-deepBlue font-bold">S</StyledText>
        </StyledView>
      </StyledView>

      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <StyledText className="text-lg font-semibold text-deepBlue mb-4">Quick Actions</StyledText>
        
        <StyledView className="flex-row flex-wrap justify-between">
            <DashboardCard 
                title="Discovery" 
                subtitle="Find Internships" 
                color="bg-indigo-500" 
                icon={<Search color="white" size={24} />} 
            />
            <DashboardCard 
                title="Applications" 
                subtitle="Track Status" 
                color="bg-green-500" 
                icon={<List color="white" size={24} />} 
            />
            <DashboardCard 
                title="Chats" 
                subtitle="Messages" 
                color="bg-pink-500" 
                icon={<MessageSquare color="white" size={24} />} 
            />
            <DashboardCard 
                title="Profile" 
                subtitle="My Identity" 
                color="bg-purple-500" 
                icon={<User color="white" size={24} />} 
            />
        </StyledView>

        <StyledText className="text-lg font-semibold text-deepBlue mt-6 mb-4">Stats Overview</StyledText>
        <StyledView className="bg-white p-6 rounded-xl shadow-sm">
            <StyledView className="flex-row justify-between border-b border-gray-100 pb-4 mb-4">
                <StyledText className="text-gray-500">Total Swipes</StyledText>
                <StyledText className="text-deepBlue font-bold text-lg">0</StyledText>
            </StyledView>
            <StyledView className="flex-row justify-between border-b border-gray-100 pb-4 mb-4">
                <StyledText className="text-gray-500">Matches</StyledText>
                <StyledText className="text-deepBlue font-bold text-lg">0</StyledText>
            </StyledView>
            <StyledView className="flex-row justify-between">
                <StyledText className="text-gray-500">Profile Views</StyledText>
                <StyledText className="text-deepBlue font-bold text-lg">0</StyledText>
            </StyledView>
        </StyledView>
      </ScrollView>
    </StyledView>
  );
}

function DashboardCard({ title, subtitle, color, icon }: any) {
    // Note: color prop in nativewind with bg-${color} sometimes requires safe-listing or valid class names.
    // For simplicity, we just use a stable class or inline style if needed. 
    // Here we assume basic standard tailwind colors work.
    return (
        <StyledTouchableOpacity className="bg-white w-[48%] p-4 rounded-xl shadow-sm mb-4 border border-gray-100">
            <StyledView className={`w-12 h-12 rounded-xl ${color} items-center justify-center mb-3`}>
                {icon}
            </StyledView>
            <StyledText className="text-gray-500 text-xs font-medium">{subtitle}</StyledText>
            <StyledText className="text-deepBlue text-lg font-bold">{title}</StyledText>
        </StyledTouchableOpacity>
    )
}
