import React from 'react';
import { InternshipCard as InternshipCardType } from '../../../../shared/types/internship-card';
import InternshipCard from '../cards/InternshipCard';

interface InternshipPreviewProps {
  data: Partial<InternshipCardType>;
}

export default function InternshipPreview({ data }: InternshipPreviewProps) {
  // Construct a valid card object from partial data for preview
  const previewCard: InternshipCardType = {
    state: 'open' as any,
    actions: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    ownerId: 'preview',
    id: 'preview',
    type: 'internship',
    summary: {
      title: data.expanded?.role.title || 'Untitled Internship',
      headline: data.expanded?.role.title || 'Untitled Internship',
      subheadline: data.expanded?.company.name || 'Company Name',
      company: {
        name: data.expanded?.company.name || 'Company Name',
        logoUrl: data.expanded?.company.logoUrl,
        industry: data.expanded?.company.industry || 'Industry',
      },
      quickFacts: {
        duration: `${data.expanded?.duration.length.min}-${data.expanded?.duration.length.max} ${data.expanded?.duration.length.unit}`,
        location: data.expanded?.duration.location || 'Remote',
        compensation: data.expanded?.compensation.type === 'paid' 
          ? `${data.expanded?.compensation.amount?.currency} ${data.expanded?.compensation.amount?.value}/${data.expanded?.compensation.amount?.period}`
          : data.expanded?.compensation.type || 'Unpaid',
        arrangement: data.expanded?.duration.arrangement || 'Remote',
      },
    },
    expanded: data.expanded as any, // Type assertion for preview
    recruiterId: 'current-user',
    companyId: 'current-company',
    positions: 1,
    positionsFilled: 0,
    applicationCount: 0,
    acceptingApplications: true,
    publishedAt: new Date(),
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Preview</h3>
      <div className="max-w-2xl mx-auto">
        <InternshipCard card={previewCard} isExpanded={true} />
      </div>
    </div>
  );
}
