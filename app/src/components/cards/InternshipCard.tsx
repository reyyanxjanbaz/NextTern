import React from 'react';
import { InternshipCard as InternshipCardType, INTERNSHIP_CARD_ACTIONS } from '../../../../shared/types/internship-card';
import CardRenderer from './CardRenderer';
import { InternshipCardExpanded } from './InternshipCardExpanded';
import { Briefcase, MapPin, Clock, DollarSign } from 'lucide-react';
import { WhyThisMatch } from './WhyThisMatch';

interface InternshipCardProps {
  card: InternshipCardType;
  isExpanded?: boolean;
  onToggleExpand?: () => void;
  onAction?: (actionId: string) => void;
}

export default function InternshipCard({
  card,
  isExpanded = false,
  onToggleExpand,
  onAction,
}: InternshipCardProps) {
  const { summary, expanded } = card;

  // Generate sections dynamically from the structured data
  const sections = [
    { id: 'role-clarity', title: 'Role Clarity', content: expanded.role },
    { id: 'company-context', title: 'Company Context', content: expanded.company },
    { id: 'learning-outcomes', title: 'Learning Outcomes', content: expanded.learning },
    { id: 'expectations', title: 'Practical Expectations', content: expanded.expectations },
    { id: 'compensation', title: 'Duration & Compensation', content: { compensation: expanded.compensation, duration: expanded.duration } },
  ];

  const cardWithSections = {
    ...card,
    expanded: {
      ...card.expanded,
      sections,
    },
  };

  const renderSummary = () => (
    <div className="flex flex-col space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          {summary.company.logoUrl ? (
            <img
              src={summary.company.logoUrl}
              alt={summary.company.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
          ) : (
            <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
              {summary.company.name.charAt(0)}
            </div>
          )}
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{summary.title}</h3>
            <p className="text-sm text-gray-600">{summary.company.name} • {summary.company.industry}</p>
          </div>
        </div>
        <WhyThisMatch internshipId={card.id} />
      </div>

      <div className="grid grid-cols-2 gap-3 text-sm text-gray-600">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span>{summary.quickFacts.duration}</span>
        </div>
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <span>{summary.quickFacts.location}</span>
        </div>
        <div className="flex items-center space-x-2">
          <DollarSign className="w-4 h-4 text-gray-400" />
          <span>{summary.quickFacts.compensation}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Briefcase className="w-4 h-4 text-gray-400" />
          <span>{summary.quickFacts.arrangement}</span>
        </div>
      </div>
    </div>
  );

  return (
    <CardRenderer
      card={card}
      isExpanded={isExpanded}
      onToggleExpand={onToggleExpand}
      onAction={onAction}
      renderSummary={renderSummary}
      renderSection={(section) => (
        <InternshipCardExpanded section={section} card={card} />
      )}
      actions={Object.values(INTERNSHIP_CARD_ACTIONS)}
    />
  );
}
