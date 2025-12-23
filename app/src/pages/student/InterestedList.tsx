import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { InternshipCard as InternshipCardType } from '../../../../shared/types/internship-card';
import InternshipCard from '../../components/cards/InternshipCard';

export default function InterestedList() {
  const [interests, setInterests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInterests();
  }, []);

  const loadInterests = async () => {
    try {
      const res = await api.get('/interest/interested');
      setInterests(res.data);
    } catch (error) {
      console.error('Failed to load interests', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Interests</h1>
        
        {interests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">You haven't expressed interest in any internships yet.</p>
            <p className="text-gray-400 mt-2">Go to Discovery to find opportunities.</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {interests.map((interest) => {
              // Map the nested internship data to the card format
              // The API returns Match objects which contain the internship
              const internship = interest.internship;
              
              // Construct a valid card object from the API response
              // This mapping is necessary because the API returns raw Prisma objects
              // and our components expect the Card structure
              const card: InternshipCardType = {
                id: internship.id,
                type: 'internship',
                summary: {
                  id: internship.id,
                  type: 'internship',
                  title: internship.title,
                  headline: internship.title,
                  subheadline: internship.company.name,
                  company: {
                    name: internship.company.name,
                    logoUrl: internship.company.logoUrl,
                    industry: internship.company.industry,
                  },
                  quickFacts: {
                    duration: `${internship.lengthMin}-${internship.lengthMax} ${internship.lengthUnit}`,
                    location: internship.location || 'Remote',
                    compensation: internship.compensationType,
                    arrangement: internship.arrangement,
                  },
                },
                expanded: {
                  company: internship.company,
                  role: {
                    title: internship.title,
                    team: internship.team,
                    purpose: internship.purpose,
                    responsibilities: internship.responsibilities,
                    collaboration: internship.collaboration,
                  },
                  learning: {
                    skills: internship.skillsToLearn,
                    projectTypes: internship.projectTypes,
                    mentorship: { available: internship.mentorshipAvailable, description: internship.mentorshipDetails },
                    growthOpportunities: internship.growthOpportunities,
                  },
                  expectations: {
                    requiredSkills: internship.requiredSkills,
                    preferredSkills: internship.preferredSkills,
                    education: { level: internship.educationLevel, fields: internship.educationFields },
                    otherRequirements: internship.otherRequirements,
                  },
                  compensation: {
                    type: internship.compensationType,
                    amount: internship.compensationAmount,
                    benefits: internship.benefits,
                  },
                  duration: {
                    startDate: internship.startDate || 'flexible',
                    length: { min: internship.lengthMin, max: internship.lengthMax, unit: internship.lengthUnit },
                    hoursPerWeek: { min: internship.hoursPerWeekMin, max: internship.hoursPerWeekMax },
                    arrangement: internship.arrangement,
                    location: internship.location,
                  },
                },
                recruiterId: internship.recruiterId,
                companyId: internship.companyId,
                positions: internship.positions,
                positionsFilled: internship.positionsFilled,
                applicationCount: 0,
                acceptingApplications: internship.acceptingApplications,
              };

              return (
                <div key={interest.id} className="bg-white rounded-lg shadow overflow-hidden">
                  <InternshipCard card={card} />
                  <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 text-sm text-gray-500 flex justify-between">
                    <span>Interested on {new Date(interest.studentInterestedAt).toLocaleDateString()}</span>
                    {interest.isMatched && (
                      <span className="text-green-600 font-bold flex items-center gap-1">
                        Matched!
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
