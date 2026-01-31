import React, { useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, Animated, Easing } from 'react-native';
import { styled } from 'nativewind';
import { Briefcase, MessageSquare, ArrowLeftRight, FileText, LayoutDashboard } from 'lucide-react-native';
import { api, NotificationBadges } from '../services/api';

const StyledText = styled(Text);

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
  { name: 'Swipe', icon: ArrowLeftRight, label: 'Swipe' },
  { name: 'Applications', icon: FileText, label: 'Track' },
  { name: 'Dashboard', icon: LayoutDashboard, label: 'Profile' },
];

interface TabButtonProps {
  tab: TabItem;
  isActive: boolean;
  onPress: () => void;
  showBadge?: boolean;
}

function TabButton({ tab, isActive, onPress, showBadge }: TabButtonProps) {
  const pillWidth = useRef(new Animated.Value(44)).current;
  const labelOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isActive) {
      Animated.parallel([
        Animated.timing(pillWidth, {
          toValue: 100,
          duration: 250,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(labelOpacity, {
          toValue: 1,
          duration: 200,
          delay: 50,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(pillWidth, {
          toValue: 44,
          duration: 200,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: false,
        }),
        Animated.timing(labelOpacity, {
          toValue: 0,
          duration: 100,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isActive]);

  const Icon = tab.icon;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: 44,
      }}
    >
      <Animated.View
        style={{
          width: pillWidth,
          height: 44,
          borderRadius: 22,
          backgroundColor: isActive ? '#A8D5BA' : 'transparent',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          paddingHorizontal: isActive ? 16 : 0,
        }}
      >
        <View style={{ position: 'relative' }}>
          <Icon
            size={22}
            color={isActive ? '#FFFFFF' : (tab.name === 'Swipe' ? '#A8D5BA' : '#9CA3AF')}
            strokeWidth={tab.name === 'Swipe' ? 3.5 : 2}
          />
          {showBadge && !isActive && (
            <View
              style={{
                position: 'absolute',
                top: -2,
                right: -4,
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: '#EF4444',
                borderWidth: 1.5,
                borderColor: '#F5F5F0',
              }}
            />
          )}
        </View>
        <Animated.View style={{ opacity: labelOpacity, marginLeft: isActive ? 8 : 0, position: isActive ? 'relative' : 'absolute' }}>
          {isActive && (
            <StyledText
              style={{
                fontSize: 14,
                fontWeight: `${tab.name === 'Swipe' ? 800 : 500}`,
                color: '#FFFFFF',
              }}
            >
              {tab.label}
            </StyledText>
          )}
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default function BottomNavbar({ currentTab, onTabChange }: BottomNavbarProps) {
  const [badges, setBadges] = useState<NotificationBadges>({ chat: 0, applications: 0 });

  useEffect(() => {
    const fetchBadges = async () => {
      try {
        const result = await api.getNotificationBadges();
        setBadges(result);
      } catch (error) {
        console.error('Failed to fetch notification badges:', error);
      }
    };

    fetchBadges();
    // Refresh badges every 30 seconds
    const interval = setInterval(fetchBadges, 30000);
    return () => clearInterval(interval);
  }, []);

  const getBadgeForTab = (tabName: TabName): boolean => {
    if (tabName === 'Chat') return badges.chat > 0;
    if (tabName === 'Applications') return badges.applications > 0;
    return false;
  };

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 24,
        left: 20,
        right: 20,
        height: 64,
        backgroundColor: '#F5F5F0',
        borderRadius: 32,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        paddingHorizontal: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 16,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.04)',
      }}
    >
      {tabs.map((tab) => (
        <TabButton
          key={tab.name}
          tab={tab}
          isActive={currentTab === tab.name}
          onPress={() => onTabChange(tab.name)}
          showBadge={getBadgeForTab(tab.name)}
        />
      ))}
    </View>
  );
}
