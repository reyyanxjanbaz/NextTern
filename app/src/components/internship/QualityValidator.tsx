import React, { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface QualityValidatorProps {
  content: string;
  fieldLabel: string;
}

const BUZZWORDS = [
  'rockstar', 'ninja', 'guru', 'wizard', 'hustler',
  'work hard play hard', 'wear many hats', 'fast-paced environment',
  'self-starter', 'hit the ground running', 'synergy', 'disrupt'
];

export default function QualityValidator({ content, fieldLabel }: QualityValidatorProps) {
  const [warnings, setWarnings] = useState<string[]>([]);

  useEffect(() => {
    if (!content) {
      setWarnings([]);
      return;
    }

    const foundBuzzwords = BUZZWORDS.filter(word => 
      content.toLowerCase().includes(word.toLowerCase())
    );

    if (foundBuzzwords.length > 0) {
      setWarnings(foundBuzzwords);
    } else {
      setWarnings([]);
    }
  }, [content]);

  if (warnings.length === 0) return null;

  return (
    <div className="mt-2 rounded-md bg-yellow-50 p-3">
      <div className="flex">
        <div className="flex-shrink-0">
          <AlertTriangle className="h-5 w-5 text-yellow-400" aria-hidden="true" />
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-yellow-800">Quality Check: {fieldLabel}</h3>
          <div className="mt-2 text-sm text-yellow-700">
            <p>
              We detected some buzzwords that might discourage candidates:
              <span className="font-semibold"> {warnings.join(', ')}</span>.
            </p>
            <p className="mt-1">
              Consider replacing them with specific examples of responsibilities or culture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
