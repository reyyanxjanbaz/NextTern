import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Save } from 'lucide-react';
import { InternshipCardExpanded } from '../../../../shared/types/internship-card';
import RoleClarityBlock from '../../components/internship/RoleClarityBlock';
import CompanyContextBlock from '../../components/internship/CompanyContextBlock';
import LearningOutcomesBlock from '../../components/internship/LearningOutcomesBlock';
import ExpectationsBlock from '../../components/internship/ExpectationsBlock';
import CompensationBlock from '../../components/internship/CompensationBlock';
import InternshipPreview from '../../components/internship/InternshipPreview';
import QualityValidator from '../../components/internship/QualityValidator';

const STEPS = [
  { id: 'company', title: 'Company Context' },
  { id: 'role', title: 'Role Clarity' },
  { id: 'learning', title: 'Learning Outcomes' },
  { id: 'expectations', title: 'Expectations' },
  { id: 'compensation', title: 'Duration & Pay' },
  { id: 'preview', title: 'Preview & Publish' },
];

const INITIAL_DATA: InternshipCardExpanded = {
  company: {
    name: '',
    description: '',
    industry: '',
    size: 'startup',
    stage: 'early-stage',
    locations: [],
    website: '',
  },
  role: {
    title: '',
    team: '',
    purpose: '',
    responsibilities: [],
    collaboration: [],
  },
  learning: {
    skills: [],
    projectTypes: [],
    mentorship: { available: false },
    growthOpportunities: [],
  },
  expectations: {
    requiredSkills: [],
    preferredSkills: [],
    education: { level: 'any' },
    otherRequirements: [],
  },
  compensation: {
    type: 'paid',
    benefits: [],
  },
  duration: {
    startDate: 'flexible',
    length: { min: 8, max: 12, unit: 'weeks' },
    hoursPerWeek: { min: 20, max: 40 },
    arrangement: 'remote',
  },
};

export default function InternshipEditor() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<InternshipCardExpanded>(INITIAL_DATA);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handlePublish = async () => {
    // TODO: API call to save internship
    console.log('Publishing internship:', formData);
    navigate('/recruiter/dashboard');
  };

  const updateFormData = (section: keyof InternshipCardExpanded, data: any) => {
    setFormData({ ...formData, [section]: data });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <CompanyContextBlock
            data={formData.company}
            onChange={(data) => updateFormData('company', data)}
          />
        );
      case 1:
        return (
          <>
            <RoleClarityBlock
              data={formData.role}
              onChange={(data) => updateFormData('role', data)}
            />
            <QualityValidator content={formData.role.purpose} fieldLabel="Role Purpose" />
          </>
        );
      case 2:
        return (
          <LearningOutcomesBlock
            data={formData.learning}
            onChange={(data) => updateFormData('learning', data)}
          />
        );
      case 3:
        return (
          <ExpectationsBlock
            data={formData.expectations}
            onChange={(data) => updateFormData('expectations', data)}
          />
        );
      case 4:
        return (
          <CompensationBlock
            compensation={formData.compensation}
            duration={formData.duration}
            onCompensationChange={(data) => updateFormData('compensation', data)}
            onDurationChange={(data) => updateFormData('duration', data)}
          />
        );
      case 5:
        return <InternshipPreview data={{ expanded: formData }} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <nav aria-label="Progress" className="mb-8">
          <ol role="list" className="flex items-center">
            {STEPS.map((step, index) => (
              <li key={step.id} className={`relative ${index !== STEPS.length - 1 ? 'pr-8 sm:pr-20' : ''}`}>
                <div className="flex items-center">
                  <div
                    className={`${
                      index <= currentStep ? 'bg-indigo-600' : 'bg-gray-200'
                    } h-8 w-8 rounded-full flex items-center justify-center`}
                  >
                    <span className="text-white font-medium text-sm">{index + 1}</span>
                  </div>
                  <span className="ml-3 text-sm font-medium text-gray-900 hidden sm:block">{step.title}</span>
                </div>
                {index !== STEPS.length - 1 && (
                  <div className="absolute top-4 left-8 -ml-px w-full h-0.5 bg-gray-200" aria-hidden="true">
                    <div
                      className={`h-0.5 bg-indigo-600 transition-all duration-500 ${
                        index < currentStep ? 'w-full' : 'w-0'
                      }`}
                    />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {/* Main Content */}
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {renderStep()}
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="px-4 py-4 sm:px-6 bg-gray-50 flex justify-between rounded-b-lg">
            <button
              type="button"
              onClick={handleBack}
              disabled={currentStep === 0}
              className={`inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                currentStep === 0 ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <ChevronLeft className="-ml-1 mr-2 h-5 w-5" />
              Back
            </button>
            {currentStep === STEPS.length - 1 ? (
              <button
                type="button"
                onClick={handlePublish}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <Save className="-ml-1 mr-2 h-5 w-5" />
                Publish Internship
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Next
                <ChevronRight className="ml-2 -mr-1 h-5 w-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
