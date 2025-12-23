import React, { useState } from 'react';
import { ProfileCard } from '../../components/cards/ProfileCard';
import { ProfileCard as ProfileCardType } from '@shared/types/profile-card';
import { IdentityBlock } from '../../components/profile/IdentityBlock';
import { RoleIntentBlock } from '../../components/profile/RoleIntentBlock';
import { AvailabilityBlock } from '../../components/profile/AvailabilityBlock';
import { SkillsBlock } from '../../components/profile/SkillsBlock';
import { ProjectsBlock } from '../../components/profile/ProjectsBlock';

// Mock initial profile
const INITIAL_PROFILE: ProfileCardType = {
  id: 'draft',
  type: 'profile',
  state: 'draft',
  userId: 'current-user',
  createdAt: new Date(),
  updatedAt: new Date(),
  ownerId: 'current-user',
  visibility: 'private',
  lastActiveAt: new Date(),
  isDiscoverable: false,
  actions: [],
  summary: {
    headline: 'Your Name',
    subheadline: 'Student at University',
    identity: {
      name: 'Your Name',
      headline: 'Student at University',
    },
    topSkills: [],
    availabilitySummary: 'Flexible',
    completeness: 0,
  },
  expanded: {
    identity: {
      name: 'Your Name',
      headline: 'Student at University',
    },
    roleIntent: {
      roleTypes: [],
      industries: [],
      learningGoals: [],
    },
    availability: {
      startDate: new Date(),
      duration: 'flexible',
      hoursPerWeek: 'flexible',
      locationPreferences: [],
    },
    skills: [],
    projectIds: [],
    links: [],
    sections: [
      { id: 'identity', title: 'Identity', content: {} },
      { id: 'intent', title: 'Role Intent', content: {} },
      { id: 'availability', title: 'Availability', content: {} },
      { id: 'skills', title: 'Skills', content: {} },
      { id: 'projects', title: 'Projects', content: {} },
    ],
  },
};

export const ProfileBuilder: React.FC = () => {
  const [profile, setProfile] = useState<ProfileCardType>(INITIAL_PROFILE);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { id: 'identity', label: 'Identity' },
    { id: 'intent', label: 'Intent' },
    { id: 'availability', label: 'Availability' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
  ];

  const updateProfile = (updates: Partial<ProfileCardType['expanded']>) => {
    setProfile((prev) => {
      const expanded = { ...prev.expanded, ...updates };
      
      // Update summary based on expanded data
      const summary = {
        ...prev.summary,
        headline: expanded.identity.name,
        subheadline: expanded.identity.headline,
        identity: expanded.identity,
        topSkills: expanded.skills.slice(0, 3).map(s => ({ name: s.name, hasProof: s.hasProof })),
        availabilitySummary: `${expanded.availability.duration} • ${expanded.availability.hoursPerWeek}`,
      };

      return { ...prev, expanded, summary };
    });
  };

  const renderStep = () => {
    switch (steps[activeStep].id) {
      case 'identity':
        return (
          <IdentityBlock
            profile={profile}
            onChange={(identity) => updateProfile({ identity: { ...profile.expanded.identity, ...identity } })}
          />
        );
      case 'intent':
        return (
          <RoleIntentBlock
            profile={profile}
            onChange={(roleIntent) => updateProfile({ roleIntent: { ...profile.expanded.roleIntent, ...roleIntent } })}
          />
        );
      case 'availability':
        return (
          <AvailabilityBlock
            profile={profile}
            onChange={(availability) => updateProfile({ availability: { ...profile.expanded.availability, ...availability } })}
          />
        );
      case 'skills':
        return (
          <SkillsBlock
            profile={profile}
            onChange={(skills) => updateProfile({ skills })}
          />
        );
      case 'projects':
        return (
          <ProjectsBlock
            profile={profile}
            onChange={(projectIds) => updateProfile({ projectIds })}
            onAddProject={() => alert('Project creation modal would open here')}
          />
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Editor Column */}
          <div className="flex-1">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Build Your Profile</h2>
              
              {/* Steps Navigation */}
              <nav aria-label="Progress" className="mb-8">
                <ol className="flex items-center">
                  {steps.map((step, index) => (
                    <li key={step.id} className={index !== steps.length - 1 ? 'relative pr-8 sm:pr-20' : 'relative'}>
                      <div className="flex items-center">
                        <div
                          className={`relative flex h-8 w-8 items-center justify-center rounded-full border-2 ${
                            index <= activeStep
                              ? 'border-indigo-600 bg-indigo-600'
                              : 'border-gray-300 bg-white'
                          }`}
                        >
                          <span className={`h-2.5 w-2.5 rounded-full ${index <= activeStep ? 'bg-white' : 'bg-transparent'}`} />
                        </div>
                        <span className="ml-4 text-sm font-medium text-gray-900">{step.label}</span>
                      </div>
                      {index !== steps.length - 1 && (
                        <div className="absolute top-4 left-0 -ml-px mt-0.5 h-0.5 w-full bg-gray-200" aria-hidden="true" />
                      )}
                    </li>
                  ))}
                </ol>
              </nav>

              {/* Form Content */}
              <div className="mt-8">
                {renderStep()}

                <div className="mt-8 flex justify-between">
                  <button
                    onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                    disabled={activeStep === 0}
                    className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setActiveStep(Math.min(steps.length - 1, activeStep + 1))}
                    disabled={activeStep === steps.length - 1}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Column */}
          <div className="lg:w-1/3">
            <div className="sticky top-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Live Preview</h3>
              <ProfileCard profile={profile} defaultExpanded={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileBuilder;
