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
      return <CompensationSection data={section.content} />;
    default:
      return <div className="text-gray-500">Content not available</div>;
  }
};

// ... existing sections ...

const CompensationSection = ({ data }: { data: { compensation: InternshipCardExpandedType['compensation'], duration: InternshipCardExpandedType['duration'] } }) => {
  const { compensation, duration } = data;
  return (
    <div className="space-y-6">
      {/* Duration Info */}
      <div className="bg-gray-50 p-4 rounded-lg space-y-3">
        <h5 className="text-sm font-medium text-gray-900">Duration & Timing</h5>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-500 block">Length</span>
            <span className="font-medium">{duration.length.min}-{duration.length.max} {duration.length.unit}</span>
          </div>
          <div>
            <span className="text-gray-500 block">Hours</span>
            <span className="font-medium">{duration.hoursPerWeek.min}-{duration.hoursPerWeek.max} hrs/week</span>
          </div>
          <div>
            <span className="text-gray-500 block">Start Date</span>
            <span className="font-medium">
              {duration.startDate === 'flexible' ? 'Flexible' : 
               duration.startDate === 'immediate' ? 'Immediate' : 
               new Date(duration.startDate).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="text-gray-500 block">Location</span>
            <span className="font-medium capitalize">{duration.arrangement} {duration.location ? `(${duration.location})` : ''}</span>
          </div>
        </div>
      </div>

      {/* Compensation Info */}
      <div className="space-y-3">
        <h5 className="text-sm font-medium text-gray-900">Compensation</h5>
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
            <span className="text-sm text-gray-500 block mb-1">Benefits</span>
            <ul className="list-disc list-inside text-sm text-gray-600">
              {compensation.benefits.map((benefit, idx) => (
                <li key={idx}>{benefit}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};
