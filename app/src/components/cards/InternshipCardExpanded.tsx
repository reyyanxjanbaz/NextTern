import React from 'react';
import { InternshipCard, InternshipCardExpanded as InternshipCardExpandedType } from '../../../../shared/types/internship-card';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface InternshipCardExpandedProps {
  section: {
    id: string;
    title: string;
    type?: string;
    content?: any;
  };
  card: InternshipCard;
}

export const InternshipCardExpanded: React.FC<InternshipCardExpandedProps> = ({
  section,
  card,
}) => {
  const { expanded } = card;

  switch (section.id) {
    case 'role-clarity':
      return <RoleClaritySection role={expanded.role} />;
    case 'company-context':
      return <CompanyContextSection company={expanded.company} />;
    case 'learning-outcomes':
      return <LearningOutcomesSection learning={expanded.learning} />;
    case 'expectations':
      return <ExpectationsSection expectations={expanded.expectations} />;
    case 'compensation':
      return <CompensationSection compensation={expanded.compensation} />;
    default:
      return <div className="text-gray-500">Content not available</div>;
  }
};

const RoleClaritySection = ({ role }: { role: InternshipCardExpandedType['role'] }) => (
  <div className="space-y-4">
    <div>
      <h5 className="text-sm font-medium text-gray-700">Purpose</h5>
      <p className="text-sm text-gray-600">{role.purpose}</p>
    </div>
    <div>
      <h5 className="text-sm font-medium text-gray-700">Key Responsibilities</h5>
      <ul className="list-disc list-inside text-sm text-gray-600">
        {role.responsibilities.map((resp, idx) => (
          <li key={idx}>{resp}</li>
        ))}
      </ul>
    </div>
    <div>
      <h5 className="text-sm font-medium text-gray-700">Collaboration</h5>
      <ul className="list-disc list-inside text-sm text-gray-600">
        {role.collaboration.map((collab, idx) => (
          <li key={idx}>{collab}</li>
        ))}
      </ul>
    </div>
  </div>
);

const CompanyContextSection = ({ company }: { company: InternshipCardExpandedType['company'] }) => (
  <div className="space-y-4">
    <p className="text-sm text-gray-600">{company.description}</p>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <span className="font-medium text-gray-700">Size:</span> {company.size}
      </div>
      <div>
        <span className="font-medium text-gray-700">Stage:</span> {company.stage}
      </div>
      <div>
        <span className="font-medium text-gray-700">Locations:</span> {company.locations.join(', ')}
      </div>
      {company.website && (
        <div>
          <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
            Visit Website
          </a>
        </div>
      )}
    </div>
  </div>
);

const LearningOutcomesSection = ({ learning }: { learning: InternshipCardExpandedType['learning'] }) => (
  <div className="space-y-4">
    <div>
      <h5 className="text-sm font-medium text-gray-700">Skills You'll Gain</h5>
      <div className="flex flex-wrap gap-2 mt-1">
        {learning.skills.map((skill, idx) => (
          <span key={idx} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded text-xs font-medium">
            {skill}
          </span>
        ))}
      </div>
    </div>
    <div>
      <h5 className="text-sm font-medium text-gray-700">Project Types</h5>
      <ul className="list-disc list-inside text-sm text-gray-600">
        {learning.projectTypes.map((type, idx) => (
          <li key={idx}>{type}</li>
        ))}
      </ul>
    </div>
    {learning.mentorship.available && (
      <div className="bg-green-50 p-3 rounded-md">
        <div className="flex items-center gap-2 text-green-800 font-medium text-sm">
          <CheckCircle className="w-4 h-4" />
          Mentorship Available
        </div>
        {learning.mentorship.description && (
          <p className="text-xs text-green-700 mt-1">{learning.mentorship.description}</p>
        )}
      </div>
    )}
  </div>
);

const ExpectationsSection = ({ expectations }: { expectations: InternshipCardExpandedType['expectations'] }) => (
  <div className="space-y-4">
    <div>
      <h5 className="text-sm font-medium text-gray-700">Required Skills</h5>
      <ul className="space-y-1 mt-1">
        {expectations.requiredSkills.map((req, idx) => (
          <li key={idx} className="text-sm flex items-center justify-between">
            <span className="text-gray-700">{req.skill}</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${
              req.level === 'proficient' ? 'bg-red-100 text-red-800' :
              req.level === 'comfortable' ? 'bg-yellow-100 text-yellow-800' :
              'bg-green-100 text-green-800'
            }`}>
              {req.level}
            </span>
          </li>
        ))}
      </ul>
    </div>
    {expectations.preferredSkills.length > 0 && (
      <div>
        <h5 className="text-sm font-medium text-gray-700">Nice to Have</h5>
        <div className="flex flex-wrap gap-2 mt-1">
          {expectations.preferredSkills.map((skill, idx) => (
            <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
              {skill}
            </span>
          ))}
        </div>
      </div>
    )}
    {expectations.education && (
      <div className="text-sm text-gray-600">
        <span className="font-medium text-gray-700">Education:</span>{' '}
        {expectations.education.level === 'any' ? 'No degree required' :
         expectations.education.level === 'pursuing-degree' ? 'Currently pursuing degree' : 'Degree required'}
        {expectations.education.fields && ` in ${expectations.education.fields.join(', ')}`}
      </div>
    )}
  </div>
);

const CompensationSection = ({ compensation }: { compensation: InternshipCardExpandedType['compensation'] }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2">
      <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${
        compensation.type === 'paid' ? 'bg-green-100 text-green-800' :
        compensation.type === 'unpaid' ? 'bg-red-100 text-red-800' :
        'bg-blue-100 text-blue-800'
      }`}>
        {compensation.type}
      </span>
      {compensation.amount && (
        <span className="text-sm font-medium text-gray-900">
          {compensation.amount.currency} {compensation.amount.value} / {compensation.amount.period}
        </span>
      )}
    </div>
    {compensation.benefits.length > 0 && (
      <div>
        <h5 className="text-sm font-medium text-gray-700">Benefits</h5>
        <ul className="list-disc list-inside text-sm text-gray-600">
          {compensation.benefits.map((benefit, idx) => (
            <li key={idx}>{benefit}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
);
