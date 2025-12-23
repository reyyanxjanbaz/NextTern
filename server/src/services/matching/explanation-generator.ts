interface MatchFactors {
  skillScore: number;
  skillMatches: string[];
  availabilityScore: number;
  availabilityIssues: string[];
  reliability: {
    student: number;
    recruiter: number;
  };
}

export class ExplanationGenerator {
  /**
   * Generate a plain-language explanation for a match.
   * Spec US8: No opaque scores, just clear reasons.
   */
  generate(factors: MatchFactors): string {
    const reasons: string[] = [];

    // 1. Skills
    if (factors.skillScore > 80) {
      reasons.push(`Strong skill match (${factors.skillMatches.slice(0, 3).join(', ')}).`);
    } else if (factors.skillScore > 50) {
      reasons.push(`Good skill overlap, matching ${factors.skillMatches.length} key requirements.`);
    } else {
      reasons.push('Some skill gaps, but potential for learning.');
    }

    // 2. Availability
    if (factors.availabilityScore === 100) {
      reasons.push('Perfect timing alignment.');
    } else if (factors.availabilityScore > 60) {
      reasons.push('Timing generally works.');
    } else {
      reasons.push(`Timing might be tricky: ${factors.availabilityIssues[0]}.`);
    }

    // 3. Reliability (Behavior)
    if (factors.reliability.recruiter > 80) {
      reasons.push('This recruiter is highly responsive.');
    }

    return reasons.join(' ');
  }
}

export const explanationGenerator = new ExplanationGenerator();
