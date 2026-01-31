import { ProficiencyLevel } from '../../../../shared/types/profile-card.js';

interface Skill {
  name: string;
  proficiency: ProficiencyLevel;
  hasProof: boolean;
}

interface RequiredSkill {
  skill: string;
  level?: string;
}

export class SkillOverlapCalculator {
  /**
   * Calculate overlap between student skills and internship requirements.
   * Returns a score (0-100) and a list of matching skills.
   */
  calculate(studentSkills: Skill[], requiredSkills: RequiredSkill[]) {
    if (!requiredSkills.length) return { score: 100, matches: [] };

    let matchCount = 0;
    let weightedScore = 0;
    const matches: string[] = [];

    // Normalize skills for comparison
    const normalizedStudentSkills = studentSkills.map(s => ({
      ...s,
      normalizedName: s.name.toLowerCase().trim()
    }));

    requiredSkills.forEach(req => {
      const reqName = req.skill.toLowerCase().trim();
      
      // Find best match
      const match = normalizedStudentSkills.find(s => 
        s.normalizedName === reqName || 
        s.normalizedName.includes(reqName) || 
        reqName.includes(s.normalizedName)
      );

      if (match) {
        matchCount++;
        matches.push(match.name);
        
        // Base score for match
        let skillScore = 1.0;

        // Bonus for proof (Constitution Article V.2: Proof Over Claims)
        if (match.hasProof) {
          skillScore += 0.5; 
        }

        // Bonus for proficiency
        if (match.proficiency === 'expert') skillScore += 0.3;
        if (match.proficiency === 'advanced') skillScore += 0.2;

        weightedScore += skillScore;
      }
    });

    // Calculate final score
    // Base score is percentage of required skills matched
    const coverage = matchCount / requiredSkills.length;
    
    // Boost score based on quality of matches (proof/proficiency)
    // Cap at 100
    const finalScore = Math.min(100, Math.round((coverage * 100) + (weightedScore * 5)));

    return {
      score: finalScore,
      matches,
      missingCount: requiredSkills.length - matchCount
    };
  }
}

export const skillOverlapCalculator = new SkillOverlapCalculator();
