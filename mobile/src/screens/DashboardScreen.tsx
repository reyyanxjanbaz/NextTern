import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { styled } from 'nativewind';
import { Search, List, MessageSquare, User, Briefcase, Users, LogOut, Settings, TrendingUp, Heart, FileText } from 'lucide-react-native';
import { api, DashboardStats } from '../services/api';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

interface DashboardScreenProps {
  user: {
    id: string;
    email: string;
    role: 'STUDENT' | 'RECRUITER' | null;
    onboardingComplete?: boolean;
  } | null;
  onLogout: () => void;
}

export default function DashboardScreen({ user, onLogout }: DashboardScreenProps) {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const isRecruiter = user?.role === 'RECRUITER';
  const displayName = user?.email?.split('@')[0] || 'User';

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await api.getDashboardStats();
      setStats(response.stats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledView className="flex-1 bg-eggshell">
      {/* Header */}
      <StyledView className="bg-white px-6 pt-4 pb-4 border-b border-softGray">
        <StyledView className="flex-row justify-between items-center">
          <StyledView className="flex-1">
            <StyledText className="text-2xl font-bold text-deepBlue">Dashboard</StyledText>
            <StyledText className="text-steelGray text-sm mt-1">
              Welcome, {displayName}
            </StyledText>
          </StyledView>
          <StyledView className="flex-row items-center gap-3">
            <StyledTouchableOpacity 
              onPress={onLogout}
              className="w-10 h-10 bg-pastelRedLight rounded-full items-center justify-center"
            >
              <LogOut color="#F4A5A5" size={18} />
            </StyledTouchableOpacity>
            <StyledView className="w-12 h-12 rounded-full items-center justify-center bg-pastelGreenLight">
              <StyledText className="font-bold text-lg text-pastelGreenDark">
                {displayName.charAt(0).toUpperCase()}
              </StyledText>
            </StyledView>
          </StyledView>
        </StyledView>
      </StyledView>

      <StyledScrollView 
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Role Badge */}
        <StyledView className="self-start px-4 py-2 rounded-full mb-6 bg-pastelGreenLight">
          <StyledText className="text-sm font-semibold text-pastelGreenDark">
            {isRecruiter ? 'Recruiter Account' : 'Student Account'}
          </StyledText>
        </StyledView>

        {/* Stats Cards */}
        <StyledText className="text-lg font-semibold text-deepBlue mb-4">Overview</StyledText>
        
        {loading ? (
          <StyledView className="items-center py-8">
            <ActivityIndicator size="large" color="#A8D5BA" />
          </StyledView>
        ) : (
          <StyledView className="flex-row flex-wrap justify-between mb-6">
            <StatCard
              title={isRecruiter ? 'Applications' : 'My Applications'}
              value={stats?.totalApplications.toString() || '0'}
              icon={<FileText color="#A8D5BA" size={20} />}
            />
            <StatCard
              title="Matches"
              value={stats?.matches.toString() || '0'}
              icon={<Heart color="#F4A5A5" size={20} />}
            />
            <StatCard
              title="Interviews"
              value={stats?.interviews.toString() || '0'}
              icon={<Users color="#A8D5BA" size={20} />}
            />
            <StatCard
              title={isRecruiter ? 'Active Jobs' : 'Saved Jobs'}
              value={stats?.activeJobs.toString() || '0'}
              icon={<Briefcase color="#A8D5BA" size={20} />}
            />
          </StyledView>
        )}

        {/* Activity */}
        <StyledText className="text-lg font-semibold text-deepBlue mb-4">Recent Activity</StyledText>
        <StyledView className="bg-white rounded-2xl border border-softGray overflow-hidden">
          <ActivityItem
            title={isRecruiter ? 'New application received' : 'Application viewed'}
            subtitle="Software Engineering Intern"
            time="2 hours ago"
          />
          <ActivityItem
            title={isRecruiter ? 'Candidate shortlisted' : 'Interview scheduled'}
            subtitle="Product Design Intern"
            time="1 day ago"
          />
          <ActivityItem
            title="New message"
            subtitle="From Sarah Chen"
            time="2 days ago"
            isLast
          />
        </StyledView>

        {/* Settings */}
        <StyledTouchableOpacity className="mt-6 bg-white p-4 rounded-2xl border border-softGray flex-row items-center">
          <StyledView className="w-10 h-10 bg-softGray rounded-xl items-center justify-center mr-4">
            <Settings color="#475569" size={20} />
          </StyledView>
          <StyledView className="flex-1">
            <StyledText className="text-deepBlue font-semibold">Settings</StyledText>
            <StyledText className="text-steelGray text-sm">Preferences, notifications, account</StyledText>
          </StyledView>
        </StyledTouchableOpacity>
      </StyledScrollView>
    </StyledView>
  );
}

function StatCard({ title, value, icon }: { title: string; value: string; icon: React.ReactNode }) {
  return (
    <StyledView className="bg-white w-[48%] p-4 rounded-xl border border-softGray mb-3">
      <StyledView className="flex-row items-center justify-between mb-2">
        <StyledView className="w-10 h-10 bg-eggshell rounded-lg items-center justify-center">
          {icon}
        </StyledView>
        <StyledText className="text-2xl font-bold text-deepBlue">{value}</StyledText>
      </StyledView>
      <StyledText className="text-steelGray text-sm">{title}</StyledText>
    </StyledView>
  );
}

function ActivityItem({ title, subtitle, time, isLast }: { title: string; subtitle: string; time: string; isLast?: boolean }) {
  return (
    <StyledView className={`p-4 ${!isLast ? 'border-b border-softGray' : ''}`}>
      <StyledView className="flex-row items-center justify-between">
        <StyledView className="flex-1">
          <StyledText className="text-deepBlue font-medium">{title}</StyledText>
          <StyledText className="text-steelGray text-sm">{subtitle}</StyledText>
        </StyledView>
        <StyledText className="text-steelGray text-xs">{time}</StyledText>
      </StyledView>
    </StyledView>
  );
}
