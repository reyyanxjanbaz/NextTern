import { prisma } from '../../db/client.js';

export class BehaviorAnalyzer {
  /**
   * Analyze past behavior to predict match quality.
   * Looks at:
   * - Response rate
   * - Completion rate
   * - Feedback from previous loops
   */
  async analyze(studentId: string, recruiterId: string) {
    // 1. Check student responsiveness
    const studentStats = await prisma.application.aggregate({
      where: { studentId },
      _count: {
        _all: true,
        closureReason: true
      }
    });

    // 2. Check recruiter responsiveness
    const recruiterStats = await prisma.application.aggregate({
      where: { recruiterId },
      _count: {
        _all: true,
        closureReason: true
      }
    });

    // Calculate "Ghosting Risk"
    // If closure rate is low, it means many applications are left open (ghosted)
    const studentClosureRate = studentStats._count._all > 0 
      ? studentStats._count.closureReason / studentStats._count._all 
      : 1;

    const recruiterClosureRate = recruiterStats._count._all > 0
      ? recruiterStats._count.closureReason / recruiterStats._count._all
      : 1;

    return {
      studentReliability: Math.round(studentClosureRate * 100),
      recruiterReliability: Math.round(recruiterClosureRate * 100),
      isHighIntent: studentClosureRate > 0.7 && recruiterClosureRate > 0.7
    };
  }
}

export const behaviorAnalyzer = new BehaviorAnalyzer();
