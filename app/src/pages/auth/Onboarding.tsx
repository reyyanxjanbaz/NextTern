import React, { useState } from 'react';
import { api } from '../../services/api';

export const Onboarding: React.FC = () => {
  const [role, setRole] = useState<'STUDENT' | 'RECRUITER' | null>(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'sent' | 'error'>('idle');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!role) return;
    
    setStatus('loading');
    setError('');

    try {
      await api.post('/auth/magic-link', { email, role });
      setStatus('sent');
    } catch (err: any) {
      setStatus('error');
      setError(err.message || 'Failed to start onboarding');
    }
  };

  if (status === 'sent') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">Check your email</h2>
          <p className="mt-2 text-gray-600">
            We've sent a verification link to <strong>{email}</strong>.
            <br />
            Click it to complete your {role?.toLowerCase()} account setup.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Join NextTern
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Choose how you want to use the platform
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!role ? (
            <div className="space-y-4">
              <button
                onClick={() => setRole('STUDENT')}
                className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors group"
              >
                <div className="text-left">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-700">I'm a Student</h3>
                  <p className="text-sm text-gray-500">Looking for internships and opportunities</p>
                </div>
                <span className="text-2xl">🎓</span>
              </button>

              <button
                onClick={() => setRole('RECRUITER')}
                className="w-full flex items-center justify-between p-4 border-2 border-gray-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-colors group"
              >
                <div className="text-left">
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-indigo-700">I'm a Recruiter</h3>
                  <p className="text-sm text-gray-500">Hiring talent for my company</p>
                </div>
                <span className="text-2xl">💼</span>
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <button
                  type="button"
                  onClick={() => setRole(null)}
                  className="text-sm text-indigo-600 hover:text-indigo-500 mb-4 flex items-center"
                >
                  ← Back to role selection
                </button>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address for {role === 'STUDENT' ? 'Student' : 'Recruiter'}
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              {status === 'error' && (
                <div className="text-red-600 text-sm">{error}</div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
              >
                {status === 'loading' ? 'Sending...' : 'Continue'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
