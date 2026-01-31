import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';
import { Briefcase, MessageSquare, Heart, FileText, LayoutDashboard } from 'lucide-react-native';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);

export type TabName = 'Jobs' | 'Chat' | 'Swipe' | 'Applications' | 'Dashboard';

interface BottomNavbarProps {
  currentTab: TabName;
  onTabChange: (tab: TabName) => void;
}

interface TabItem {
  name: TabName;
  icon: any;
  label: string;
}

const tabs: TabItem[] = [
  { name: 'Jobs', icon: Briefcase, label: 'Jobs' },
  { name: 'Chat', icon: MessageSquare, label: 'Chat' },
  { name: 'Swipe', icon: Heart, label: 'Swipe' },
  { name: 'Applications', icon: FileText, label: 'Applications' },
  { name: 'Dashboard', icon: LayoutDashboard, label: 'Dashboard' },
];

export default function BottomNavbar({ currentTab, onTabChange }: BottomNavbarProps) {
  return (
    <StyledView className="absolute bottom-0 left-0 right-0 bg-white border-t border-softGray px-2 pt-2 pb-6 flex-row justify-around items-center shadow-lg">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.name;
        const Icon = tab.icon;

        return (
          <StyledTouchableOpacity
            key={tab.name}
            onPress={() => onTabChange(tab.name)}
            className={`items-center justify-center py-2 px-3 rounded-xl ${
              isActive ? 'bg-pastelGreenLight' : ''
            }`}
          >
            <Icon
              size={22}
              color={isActive ? '#81C784' : '#9CA3AF'}
            />
            <StyledText
              className={`text-xs mt-1 font-medium ${
                isActive ? 'text-pastelGreenDark' : 'text-gray-400'
              }`}
            >
              {tab.label}
            </StyledText>
          </StyledTouchableOpacity>
        );
      })}
    </StyledView>
  );
}
