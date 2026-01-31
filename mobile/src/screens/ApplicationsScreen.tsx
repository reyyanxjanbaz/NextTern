import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { styled } from 'nativewind';
import { FileText, Clock, CheckCircle, XCircle, MessageSquare, ChevronRight, Building2, User } from 'lucide-react-native';
import { api, Application } from '../services/api';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

interface ApplicationsScreenProps {
  user: {
    id: string;
    email: string;
    role: 'STUDENT' | 'RECRUITER' | null;
  } | null;
}

type StatusFilter = 'all' | 'pending' | 'reviewing' | 'interview' | 'offered' | 'rejected';

export default function ApplicationsScreen({ user }: ApplicationsScreenProps) {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState<StatusFilter>('all');

  const isRecruiter = user?.role === 'RECRUITER';

  const fetchApplications = async () => {
    try {
      const response = await api.getApplications();
      setApplications(response.applications);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchApplications();
  };

  const filteredApplications = applications.filter((app) => {
    if (filter === 'all') return true;
    return app.status.toLowerCase() === filter;
  });

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock };
      case 'reviewing':
        return { bg: 'bg-blue-100', text: 'text-blue-700', icon: FileText };
      case 'interview':
        return { bg: 'bg-purple-100', text: 'text-purple-700', icon: MessageSquare };
      case 'offered':
        return { bg: 'bg-pastelGreenLight', text: 'text-pastelGreenDark', icon: CheckCircle };
      case 'rejected':
        return { bg: 'bg-pastelRedLight', text: 'text-pastelRedDark', icon: XCircle };
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-700', icon: Clock };
    }
  };

  if (loading) {
    return (
      <StyledView className="flex-1 bg-eggshell items-center justify-center">
        <ActivityIndicator size="large" color="#A8D5BA" />
        <StyledText className="mt-4 text-steelGray">Loading applications...</StyledText>
      </StyledView>
    );
  }

  return (
    <StyledView className="flex-1 bg-eggshell">
      {/* Header */}
      <StyledView className="bg-white px-6 pt-4 pb-4 border-b border-softGray">
        <StyledText className="text-2xl font-bold text-deepBlue">
          {isRecruiter ? 'Pipeline' : 'Applications'}
        </StyledText>
        <StyledText className="text-steelGray text-sm mt-1">
          {isRecruiter ? 'Manage candidate applications' : 'Track your application status'}
        </StyledText>
      </StyledView>

      {/* Filter Tabs */}
      <StyledScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 12 }}
      >
        {(['all', 'pending', 'reviewing', 'interview', 'offered', 'rejected'] as StatusFilter[]).map((status) => (
          <StyledTouchableOpacity
            key={status}
            onPress={() => setFilter(status)}
            className={`px-4 py-2 rounded-full mr-2 ${
              filter === status ? 'bg-pastelGreen' : 'bg-white border border-softGray'
            }`}
          >
            <StyledText
              className={`text-sm font-medium capitalize ${
                filter === status ? 'text-white' : 'text-slateBlue'
              }`}
            >
              {status}
            </StyledText>
          </StyledTouchableOpacity>
        ))}
      </StyledScrollView>

      <StyledScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#A8D5BA" />
        }
      >
        {filteredApplications.length === 0 ? (
          <StyledView className="items-center justify-center py-16">
            <StyledView className="w-16 h-16 bg-pastelGreenLight rounded-full items-center justify-center mb-4">
              <FileText color="#81C784" size={32} />
            </StyledView>
            <StyledText className="text-deepBlue font-semibold text-lg mb-2">No applications found</StyledText>
            <StyledText className="text-steelGray text-center">
              {filter === 'all'
                ? isRecruiter
                  ? 'No candidates have applied yet'
                  : 'Start swiping to apply to jobs'
                : `No ${filter} applications`}
            </StyledText>
          </StyledView>
        ) : (
          <StyledView className="gap-4">
            {filteredApplications.map((application) => (
              <ApplicationCard
                key={application.id}
                application={application}
                isRecruiter={isRecruiter}
                statusStyle={getStatusColor(application.status)}
              />
            ))}
          </StyledView>
        )}
      </StyledScrollView>
    </StyledView>
  );
}

interface ApplicationCardProps {
  application: Application;
  isRecruiter: boolean;
  statusStyle: { bg: string; text: string; icon: any };
}

function ApplicationCard({ application, isRecruiter, statusStyle }: ApplicationCardProps) {
  const StatusIcon = statusStyle.icon;

  return (
    <StyledTouchableOpacity className="bg-white rounded-xl p-4 border border-softGray shadow-sm">
      <StyledView className="flex-row items-start justify-between mb-3">
        <StyledView className="flex-row items-center flex-1">
          <StyledView className="w-12 h-12 bg-pastelGreenLight rounded-full items-center justify-center mr-3">
            {isRecruiter ? <User color="#81C784" size={24} /> : <Building2 color="#81C784" size={24} />}
          </StyledView>
          <StyledView className="flex-1">
            <StyledText className="text-lg font-semibold text-deepBlue">
              {isRecruiter ? application.candidateName : application.jobTitle}
            </StyledText>
            <StyledText className="text-steelGray text-sm">
              {isRecruiter ? application.jobTitle : application.company}
            </StyledText>
          </StyledView>
        </StyledView>
        <StyledView className={`${statusStyle.bg} px-3 py-1 rounded-full flex-row items-center`}>
          <StatusIcon color={statusStyle.text.replace('text-', '#')} size={12} />
          <StyledText className={`${statusStyle.text} text-xs font-medium ml-1 capitalize`}>
            {application.status}
          </StyledText>
        </StyledView>
      </StyledView>

      {/* Timeline */}
      <StyledView className="bg-eggshell rounded-lg p-3 mb-3">
        <StyledView className="flex-row items-center">
          <Clock color="#A8D5BA" size={14} />
          <StyledText className="text-slateBlue text-sm ml-2">Applied {application.appliedDate}</StyledText>
        </StyledView>
        {application.lastUpdate && (
          <StyledText className="text-steelGray text-xs mt-1 ml-5">
            Last updated: {application.lastUpdate}
          </StyledText>
        )}
      </StyledView>

      {/* Actions */}
      <StyledView className="flex-row items-center justify-between pt-2 border-t border-softGray">
        <StyledView className="flex-row items-center">
          <StyledText className="text-steelGray text-sm">Stage: {application.stage}</StyledText>
        </StyledView>
        <StyledView className="flex-row items-center">
          <StyledText className="text-slateBlue text-sm mr-1">View details</StyledText>
          <ChevronRight color="#334155" size={16} />
        </StyledView>
      </StyledView>
    </StyledTouchableOpacity>
  );
}
