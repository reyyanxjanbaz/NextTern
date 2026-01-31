import React from 'react';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

interface PipelineCardProps {
  application: any;
  onDragStart?: (e: any) => void;
}

export const PipelineCard: React.FC<PipelineCardProps> = ({ application, onDragStart }) => {
  const { student, internship, updatedAt } = application;
  const { user, profile } = student;

  return (
    <motion.div
      layoutId={application.id}
      className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 mb-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.1}
      onDragStart={onDragStart}
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
          {user.avatarUrl ? (
            <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 font-medium">
              {user.firstName[0]}{user.lastName[0]}
            </div>
          )}
        </div>
        
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-gray-900 truncate">
            {user.firstName} {user.lastName}
          </h4>
          <p className="text-xs text-gray-500 truncate mb-1">
            {profile?.headline || 'Student'}
          </p>
          
          <div className="flex flex-wrap gap-1 mb-2">
            {profile?.skills?.map((skill: any) => (
              <span key={skill.name} className="text-[10px] px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                {skill.name}
              </span>
            ))}
          </div>

          <div className="flex justify-between items-center text-[10px] text-gray-400">
            <span className="truncate max-w-[100px]">{internship.title}</span>
            <span>{formatDistanceToNow(new Date(updatedAt), { addSuffix: true })}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
