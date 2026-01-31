import { skillOverlapCalculator } from './skill-overlap.js';
import { availabilityScorer } from './availability-scorer.js';
import { behaviorAnalyzer } from './behavior-analyzer.js';
import { explanationGenerator } from './explanation-generator.js';
import { prisma } from '../../db/client.js';

export class MatchAlgorithm {
  /**
   * Calculate match quality and generate explanation for a Student-Internship pair.
   */
  async evaluate(studentId: string, internshipId: string) {
    // 1. Fetch Data
    const student = await prisma.user.findUnique({
      where: { id: studentId },
      include: {
        profile: {
          include: { skills: true }
        }
      }
    });

    const internship = await prisma.internship.findUnique({
      where: { id: internshipId },
      include: { recruiter: true }
    });

    if (!student?.profile || !internship) {
      throw new Error('Data not found');
    }

    // 2. Calculate Factors
    
    // Skills
    // Parse required skills from JSON
    const requiredSkills = (internship.requiredSkills as any[]).map(s => ({
      skill: s.skill,
      level: s.level
    }));
    
    const skillResult = skillOverlapCalculator.calculate(
      student.profile.skills.map(s => ({
        name: s.name,
        proficiency: s.proficiency.toLowerCase() as any,
        hasProof: s.hasProof
      })),
      requiredSkills
    );

    // Availability
    const availabilityResult = availabilityScorer.score(
      {
        availableFrom: student.profile.availableFrom,
        duration: student.profile.duration,
        hoursPerWeek: student.profile.hoursPerWeek
      },
      {
        startDate: internship.startDate,
        startDateFlexible: internship.startDateFlexible,
        lengthMin: internship.lengthMin,
        lengthMax: internship.lengthMax,
        lengthUnit: internship.lengthUnit
      }
    );

    // Behavior
    const behaviorResult = await behaviorAnalyzer.analyze(studentId, internship.recruiterId);

    // 3. Generate Explanation
    const explanation = explanationGenerator.generate({
      skillScore: skillResult.score,
      skillMatches: skillResult.matches,
      availabilityScore: availabilityResult.score,
      availabilityIssues: availabilityResult.issues,
      reliability: {
        student: behaviorResult.studentReliability,
        recruiter: behaviorResult.recruiterReliability
      }
    });

    return {
      overallScore: Math.round((skillResult.score * 0.6) + (availabilityResult.score * 0.4)),
      explanation,
      factors: {
        skills: skillResult,
        availability: availabilityResult,
        behavior: behaviorResult
      }
    };
  }
}

export const matchAlgorithm = new MatchAlgorithm();
