import React, { useState } from 'react';
import { ProfileCard, Skill, ProficiencyLevel, SkillCategory } from '@shared/types/profile-card';
import { v4 as uuidv4 } from 'uuid';

interface SkillsBlockProps {
  profile: ProfileCard;
  onChange: (skills: Skill[]) => void;
}

export const SkillsBlock: React.FC<SkillsBlockProps> = ({ profile, onChange }) => {
  const { skills } = profile.expanded;
  const [newSkillName, setNewSkillName] = useState('');

  const addSkill = () => {
    if (!newSkillName.trim()) return;
    const newSkill: Skill = {
      id: uuidv4(),
      name: newSkillName.trim(),
      category: 'other',
      proficiency: 'intermediate',
      proofs: [],
      hasProof: false,
    };
    onChange([...skills, newSkill]);
    setNewSkillName('');
  };

  const updateSkill = (id: string, updates: Partial<Skill>) => {
    const updatedSkills = skills.map((skill) =>
      skill.id === id ? { ...skill, ...updates } : skill
    );
    onChange(updatedSkills);
  };

  const removeSkill = (id: string) => {
    onChange(skills.filter((skill) => skill.id !== id));
  };

  const addProof = (skillId: string) => {
    const skill = skills.find((s) => s.id === skillId);
    if (!skill) return;
    
    const url = prompt('Enter proof URL (e.g. GitHub link, Portfolio):');
    if (!url) return;

    const label = prompt('Enter label for this proof:', 'Project Link');
    
    const newProof = {
      type: 'link' as const,
      reference: url,
      label: label || 'Link',
    };

    updateSkill(skillId, {
      proofs: [...skill.proofs, newProof],
      hasProof: true,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-2">
        <input
          type="text"
          value={newSkillName}
          onChange={(e) => setNewSkillName(e.target.value)}
          placeholder="Add a skill (e.g. React, Python)"
          className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          onKeyDown={(e) => e.key === 'Enter' && addSkill()}
        />
        <button
          onClick={addSkill}
          disabled={!newSkillName.trim()}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
        >
          Add
        </button>
      </div>

      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.id} className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">{skill.name}</h4>
              <button
                onClick={() => removeSkill(skill.id)}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                Remove
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-3">
              <div>
                <label className="block text-xs font-medium text-gray-500">Proficiency</label>
                <select
                  value={skill.proficiency}
                  onChange={(e) => updateSkill(skill.id, { proficiency: e.target.value as ProficiencyLevel })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                  <option value="expert">Expert</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-500">Category</label>
                <select
                  value={skill.category}
                  onChange={(e) => updateSkill(skill.id, { category: e.target.value as SkillCategory })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-xs"
                >
                  <option value="technical">Technical</option>
                  <option value="design">Design</option>
                  <option value="business">Business</option>
                  <option value="communication">Communication</option>
                  <option value="leadership">Leadership</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-medium text-gray-500">Proofs</label>
                <button
                  onClick={() => addProof(skill.id)}
                  className="text-xs text-indigo-600 hover:text-indigo-800"
                >
                  + Add Proof
                </button>
              </div>
              {skill.proofs.length === 0 ? (
                <p className="text-xs text-gray-400 italic">No proofs added yet. Add a link to verify this skill.</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {skill.proofs.map((proof, idx) => (
                    <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-indigo-50 text-indigo-700">
                      {proof.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
