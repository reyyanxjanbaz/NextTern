import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator, RefreshControl } from 'react-native';
import { styled } from 'nativewind';
import { Briefcase, MapPin, Clock, Building2, ChevronRight } from 'lucide-react-native';
import { api, Job } from '../services/api';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledScrollView = styled(ScrollView);

interface JobsScreenProps {
  user: {
    id: string;
    email: string;
    role: 'STUDENT' | 'RECRUITER' | null;
  } | null;
}

export default function JobsScreen({ user }: JobsScreenProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const isRecruiter = user?.role === 'RECRUITER';

  const fetchJobs = async () => {
    try {
      const response = await api.getJobs();
      setJobs(response.jobs);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchJobs();
  };

  if (loading) {
    return (
      <StyledView className="flex-1 bg-eggshell items-center justify-center">
        <ActivityIndicator size="large" color="#A8D5BA" />
        <StyledText className="mt-4 text-steelGray">Loading jobs...</StyledText>
      </StyledView>
    );
  }

  return (
    <StyledView className="flex-1 bg-eggshell">
      {/* Header */}
      <StyledView className="bg-white px-6 pt-4 pb-4 border-b border-softGray">
        <StyledText className="text-2xl font-bold text-deepBlue">
          {isRecruiter ? 'My Postings' : 'Jobs'}
        </StyledText>
        <StyledText className="text-steelGray text-sm mt-1">
          {isRecruiter ? 'Manage your internship listings' : 'Find your next opportunity'}
        </StyledText>
      </StyledView>

      <StyledScrollView
        contentContainerStyle={{ padding: 16, paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#A8D5BA" />
        }
      >
        {jobs.length === 0 ? (
          <StyledView className="items-center justify-center py-16">
            <StyledView className="w-16 h-16 bg-pastelGreenLight rounded-full items-center justify-center mb-4">
              <Briefcase color="#81C784" size={32} />
            </StyledView>
            <StyledText className="text-deepBlue font-semibold text-lg mb-2">No jobs found</StyledText>
            <StyledText className="text-steelGray text-center">
              {isRecruiter ? 'Create your first job posting' : 'Check back later for new opportunities'}
            </StyledText>
          </StyledView>
        ) : (
          <StyledView className="gap-4">
            {jobs.map((job) => (
              <JobCard key={job.id} job={job} isRecruiter={isRecruiter} />
            ))}
          </StyledView>
        )}
      </StyledScrollView>
    </StyledView>
  );
}

interface JobCardProps {
  job: Job;
  isRecruiter: boolean;
}

function JobCard({ job, isRecruiter }: JobCardProps) {
  return (
    <StyledTouchableOpacity className="bg-white rounded-xl p-4 border border-softGray shadow-sm">
      <StyledView className="flex-row items-start justify-between">
        <StyledView className="flex-1">
          <StyledText className="text-lg font-semibold text-deepBlue mb-1">{job.title}</StyledText>
          <StyledView className="flex-row items-center mb-2">
            <Building2 color="#475569" size={14} />
            <StyledText className="text-steelGray text-sm ml-1">{job.company}</StyledText>
          </StyledView>
        </StyledView>
        <StyledView className="bg-pastelGreenLight px-3 py-1 rounded-full">
          <StyledText className="text-pastelGreenDark text-xs font-medium">{job.type}</StyledText>
        </StyledView>
      </StyledView>

      <StyledView className="flex-row flex-wrap gap-3 mt-3">
        <StyledView className="flex-row items-center">
          <MapPin color="#A8D5BA" size={14} />
          <StyledText className="text-slateBlue text-sm ml-1">{job.location}</StyledText>
        </StyledView>
        <StyledView className="flex-row items-center">
          <Clock color="#A8D5BA" size={14} />
          <StyledText className="text-slateBlue text-sm ml-1">{job.duration}</StyledText>
        </StyledView>
      </StyledView>

      <StyledText className="text-steelGray text-sm mt-3 leading-relaxed" numberOfLines={2}>
        {job.description}
      </StyledText>

      <StyledView className="flex-row items-center justify-between mt-4 pt-3 border-t border-softGray">
        <StyledText className="text-pastelGreenDark font-semibold">{job.salary}</StyledText>
        <StyledView className="flex-row items-center">
          <StyledText className="text-slateBlue text-sm mr-1">
            {isRecruiter ? 'View applicants' : 'View details'}
          </StyledText>
          <ChevronRight color="#334155" size={16} />
        </StyledView>
      </StyledView>
    </StyledTouchableOpacity>
  );
}
