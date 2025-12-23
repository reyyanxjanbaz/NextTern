import React from 'react';
import { ProjectCard as ProjectCardType } from '@shared/types/project-card';
import { CardRenderer } from './CardRenderer';
import { CardAction } from '@shared/types/card';

interface ProjectCardProps {
  project: ProjectCardType;
  onAction?: (action: CardAction) => void;
  className?: string;
  defaultExpanded?: boolean;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onAction,
  className,
  defaultExpanded,
}) => {
  const renderSection = (section: any) => {
    // Implement specific section rendering for ProjectCard
    // For now, we'll use a simple JSON dump or basic rendering
    // In a real implementation, this would be more sophisticated
    if (section.id === 'details') {
      return (
        <div className="space-y-4">
          <div>
            <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">The Problem</h5>
            <p className="text-sm text-gray-700">{project.expanded.problem}</p>
          </div>
          <div>
            <h5 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">The Solution</h5>
            <p className="text-sm text-gray-700">{project.expanded.solution}</p>
          </div>
        </div>
      );
    }
    
    if (section.id === 'contribution') {
      return (
        <div className="space-y-2">
          <p className="text-sm font-medium">Role: {project.expanded.contribution.role}</p>
          <ul className="list-disc list-inside text-sm text-gray-600">
            {project.expanded.contribution.contributions.map((c, i) => (
              <li key={i}>{c}</li>
            ))}
          </ul>
        </div>
      );
    }

    if (section.id === 'technologies') {
      return (
        <div className="flex flex-wrap gap-2">
          {project.expanded.technologies.map((tech, i) => (
            <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
              {tech.name}
            </span>
          ))}
        </div>
      );
    }

    if (section.id === 'links') {
      return (
        <div className="flex flex-wrap gap-3">
          {project.expanded.links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      );
    }

    return <div>{JSON.stringify(section.content)}</div>;
  };

  return (
    <CardRenderer
      card={project}
      onAction={onAction}
      className={className}
      defaultExpanded={defaultExpanded}
      renderSection={renderSection}
    />
  );
};
