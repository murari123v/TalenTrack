import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, FileText } from 'lucide-react';
import { useApp } from '../context/AppContext';
import CandidateList from '../components/CandidateList';
import AddCandidateModal from '../components/AddCandidateModal';
import { CandidateStatus } from '../types';

export default function JobDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const { state, dispatch } = useApp();
  const [showAddCandidate, setShowAddCandidate] = useState(false);

  const job = state.jobs.find((j) => j.id === id);
  const candidates = state.candidates.filter((c) => c.jobId === id);

  if (!job) return <div>Job not found</div>;

  const handleStatusChange = (candidateId: string, newStatus: CandidateStatus) => {
    const candidate = candidates.find((c) => c.id === candidateId);
    if (candidate) {
      dispatch({
        type: 'UPDATE_CANDIDATE',
        payload: { ...candidate, status: newStatus },
      });
    }
  };

  return (
    <div>
      <div className="mb-8 text-white">
        <h1 className="text-3xl font-bold ">{job.title}</h1>
        <p className="mt-2 ">{job.description}</p>
        <div className="mt-4">
          <h2 className="text-lg font-semibold ">Requirements:</h2>
          <ul className="mt-2 list-disc list-inside ">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Candidates</h2>
        <button
          onClick={() => setShowAddCandidate(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-800"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Candidate
        </button>
      </div>

      <CandidateList
        candidates={candidates}
        onStatusChange={handleStatusChange}
      />

      {showAddCandidate && (
        <AddCandidateModal
          jobId={id!}
          onClose={() => setShowAddCandidate(false)}
        />
      )}
    </div>
  );
}