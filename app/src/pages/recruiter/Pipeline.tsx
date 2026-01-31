import React, { useEffect, useState } from 'react';
import { ApplicationState } from '@nexttern/shared';
import { api } from '../../services/api';
import { PipelineColumn } from '../../components/pipeline/PipelineColumn';
import { DecisionModal } from '../../components/pipeline/DecisionModal';

const PIPELINE_STAGES = [
  ApplicationState.DISCOVERED,
  ApplicationState.VIEWED,
  ApplicationState.SHORTLISTED,
  ApplicationState.CONTACTED,
  ApplicationState.INTERVIEWING,
  ApplicationState.DECIDED,
  ApplicationState.CLOSED
];

export const Pipeline: React.FC = () => {
  const [pipeline, setPipeline] = useState<Record<ApplicationState, any[]> | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [decisionModal, setDecisionModal] = useState<{
    isOpen: boolean;
    applicationId: string;
    newState: ApplicationState;
    type: 'accept' | 'reject';
  } | null>(null);

  const fetchPipeline = async () => {
    try {
      const response = await api.get('/pipeline');
      setPipeline((response as any).data);
    } catch (error) {
      console.error('Failed to fetch pipeline:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPipeline();
  }, []);

  const handleDrop = async (applicationId: string, newState: ApplicationState) => {
    // Check for decision states that require modal
    if (newState === ApplicationState.DECIDED) {
      setDecisionModal({
        isOpen: true,
        applicationId,
        newState,
        type: 'accept' // Default to accept, can be toggled if we add UI for it
      });
      return;
    }
    
    if (newState === ApplicationState.CLOSED) {
      setDecisionModal({
        isOpen: true,
        applicationId,
        newState,
        type: 'reject'
      });
      return;
    }

    // Optimistic update
    updateLocalState(applicationId, newState);

    try {
      await api.post('/pipeline/move', {
        applicationId,
        newState
      });
    } catch (error) {
      console.error('Failed to move candidate:', error);
      fetchPipeline(); // Revert on error
    }
  };

  const updateLocalState = (applicationId: string, newState: ApplicationState) => {
    if (!pipeline) return;

    const newPipeline = { ...pipeline };
    let movedApp: any = null;

    // Find and remove from old state
    Object.keys(newPipeline).forEach((state) => {
      const s = state as ApplicationState;
      const index = newPipeline[s].findIndex(app => app.id === applicationId);
      if (index !== -1) {
        movedApp = newPipeline[s][index];
        newPipeline[s].splice(index, 1);
      }
    });

    // Add to new state
    if (movedApp) {
      movedApp.currentState = newState;
      movedApp.updatedAt = new Date().toISOString();
      newPipeline[newState].unshift(movedApp);
      setPipeline(newPipeline);
    }
  };

  const handleDecisionConfirm = async (reason: string, note: string) => {
    if (!decisionModal) return;

    const { applicationId, newState } = decisionModal;
    
    // Optimistic update
    updateLocalState(applicationId, newState);

    try {
      await api.post('/pipeline/move', {
        applicationId,
        newState,
        note,
        reason // Pass reason if backend supports it in move endpoint (it should)
      });
    } catch (error) {
      console.error('Failed to record decision:', error);
      fetchPipeline();
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!pipeline) return null;

  return (
    <div className="h-[calc(100vh-64px)] flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-900">Candidate Pipeline</h1>
        <div className="flex gap-2">
          {/* Filter controls could go here */}
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="h-full flex p-4 gap-4 min-w-max">
          {PIPELINE_STAGES.map((state) => (
            <PipelineColumn
              key={state}
              state={state}
              applications={pipeline[state]}
              onDrop={handleDrop}
            />
          ))}
        </div>
      </div>

      {decisionModal && (
        <DecisionModal
          isOpen={decisionModal.isOpen}
          onClose={() => setDecisionModal(null)}
          onConfirm={handleDecisionConfirm}
          type={decisionModal.type}
        />
      )}
    </div>
  );
};

export default Pipeline;
