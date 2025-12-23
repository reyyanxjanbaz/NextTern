import React from 'react';
import { ProfileCard } from '@shared/types/profile-card';

interface ProjectsBlockProps {
  profile: ProfileCard;
  onChange: (projectIds: string[]) => void;
  onAddProject: () => void;
}

export const ProjectsBlock: React.FC<ProjectsBlockProps> = ({ profile, onChange, onAddProject }) => {
  const { projectIds } = profile.expanded;

  const removeProject = (id: string) => {
    onChange(projectIds.filter((pid) => pid !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Projects</h3>
        <button
          onClick={onAddProject}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Add Project
        </button>
      </div>

      {projectIds.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed border-gray-300 rounded-lg">
          <p className="text-gray-500">No projects added yet.</p>
          <p className="text-sm text-gray-400 mt-1">Add projects to demonstrate your skills.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {projectIds.map((pid) => (
            <div key={pid} className="border border-gray-200 rounded-lg p-4 flex justify-between items-center">
              <div>
                <p className="font-medium text-gray-900">Project {pid}</p>
                {/* In a real app, we'd look up the project name */}
              </div>
              <button
                onClick={() => removeProject(pid)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
