import React from 'react';
import { ProfileCard, Skill, SkillProof } from '@shared/types/profile-card';
import { cn } from '../../utils/cn';

interface ProfileCardExpandedProps {
  section: { id: string; title: string; content: any };
  profile: ProfileCard;
}

export const ProfileCardExpanded: React.FC<ProfileCardExpandedProps> = ({ section, profile }) => {
  switch (section.id) {
    case 'identity':
      return <IdentitySection profile={profile} />;
    case 'intent':
      return <IntentSection profile={profile} />;
    case 'availability':
      return <AvailabilitySection profile={profile} />;
    case 'skills':
      return <SkillsSection profile={profile} />;
    case 'projects':
      return <ProjectsSection profile={profile} />;
    default:
      return <div>{JSON.stringify(section.content)}</div>;
  }
};

const IdentitySection: React.FC<{ profile: ProfileCard }> = ({ profile }) => {
  const { identity } = profile.expanded;
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-4">
        {identity.photoUrl && (
          <img src={identity.photoUrl} alt={identity.name} className="w-16 h-16 rounded-full object-cover" />
        )}
        <div>
          <h4 className="font-medium text-gray-900">{identity.name}</h4>
          <p className="text-gray-600">{identity.headline}</p>
          {identity.location && <p className="text-sm text-gray-500">{identity.location}</p>}
        </div>
      </div>
      {identity.education && (
        <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
          <p className="font-medium">{identity.education.institution}</p>
          <p>{identity.education.degree} in {identity.education.field}</p>
          <p className="text-gray-500">Class of {identity.education.graduationYear}</p>
        </div>
      )}
    </div>
  );
};

const IntentSection: React.FC<{ profile: ProfileCard }> = ({ profile }) => {
  const { roleIntent } = profile.expanded;
  return (
    <div className="space-y-3">
      {roleIntent.statement && (
        <p className="italic text-gray-700">"{roleIntent.statement}"</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Seeking Roles</h5>
          <div className="flex flex-wrap gap-2">
            {roleIntent.roleTypes.map((role) => (
              <span key={role} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">
                {role}
              </span>
            ))}
          </div>
        </div>
        <div>
          <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Industries</h5>
          <div className="flex flex-wrap gap-2">
            {roleIntent.industries.map((ind) => (
              <span key={ind} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                {ind}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">Learning Goals</h5>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {roleIntent.learningGoals.map((goal, idx) => (
            <li key={idx}>{goal}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const AvailabilitySection: React.FC<{ profile: ProfileCard }> = ({ profile }) => {
  const { availability } = profile.expanded;
  return (
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <span className="block text-gray-500 text-xs">Start Date</span>
        <span className="font-medium">{new Date(availability.startDate).toLocaleDateString()}</span>
      </div>
      <div>
        <span className="block text-gray-500 text-xs">Duration</span>
        <span className="font-medium capitalize">{availability.duration.replace(/-/g, ' ')}</span>
      </div>
      <div>
        <span className="block text-gray-500 text-xs">Commitment</span>
        <span className="font-medium capitalize">{availability.hoursPerWeek}</span>
      </div>
      <div>
        <span className="block text-gray-500 text-xs">Location</span>
        <div className="flex flex-wrap gap-1">
          {availability.locationPreferences.map((loc) => (
            <span key={loc} className="capitalize">{loc}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

const SkillsSection: React.FC<{ profile: ProfileCard }> = ({ profile }) => {
  const { skills } = profile.expanded;
  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div key={skill.id} className="flex items-start justify-between group">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{skill.name}</span>
              <span className={cn(
                "text-xs px-1.5 py-0.5 rounded",
                skill.proficiency === 'expert' ? "bg-purple-100 text-purple-800" :
                skill.proficiency === 'advanced' ? "bg-blue-100 text-blue-800" :
                skill.proficiency === 'intermediate' ? "bg-green-100 text-green-800" :
                "bg-gray-100 text-gray-800"
              )}>
                {skill.proficiency}
              </span>
            </div>
            {skill.proofs.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-2">
                {skill.proofs.map((proof, idx) => (
                  <a
                    key={idx}
                    href={proof.type === 'link' ? proof.reference : '#'}
                    className="text-xs flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
                    onClick={(e) => proof.type !== 'link' && e.preventDefault()}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
                    {proof.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const ProjectsSection: React.FC<{ profile: ProfileCard }> = ({ profile }) => {
  // In a real app, we might fetch project details or they might be embedded
  // For now, we'll assume we render a list of project IDs or placeholders
  const { projectIds } = profile.expanded;
  
  if (!projectIds || projectIds.length === 0) {
    return <p className="text-sm text-gray-500 italic">No projects added yet.</p>;
  }

  return (
    <div className="space-y-3">
      {projectIds.map((pid) => (
        <div key={pid} className="border border-gray-200 rounded p-3 bg-gray-50">
          <p className="text-sm font-medium">Project {pid}</p>
          {/* This would be a ProjectCard in summary mode ideally */}
        </div>
      ))}
    </div>
  );
};
