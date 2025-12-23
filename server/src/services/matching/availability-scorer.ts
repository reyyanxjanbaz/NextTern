import { differenceInMonths } from 'date-fns';

interface StudentAvailability {
  availableFrom?: Date | null;
  duration?: string | null; // e.g., "3-6-months"
  hoursPerWeek?: string | null; // e.g., "full-time"
}

interface InternshipTiming {
  startDate?: Date | null;
  startDateFlexible: boolean;
  lengthMin?: number | null;
  lengthMax?: number | null;
  lengthUnit?: string | null;
}

export class AvailabilityScorer {
  /**
   * Score alignment between student availability and internship timing.
   * Returns a score (0-100) and explanation.
   */
  score(student: StudentAvailability, internship: InternshipTiming) {
    let score = 100;
    const issues: string[] = [];

    // 1. Start Date Check
    if (internship.startDate && student.availableFrom) {
      const startDiff = differenceInMonths(new Date(student.availableFrom), new Date(internship.startDate));
      
      // If student is available AFTER start date
      if (startDiff > 0) {
        if (internship.startDateFlexible) {
          score -= 10 * startDiff; // Penalty for delay, but allowed
          issues.push(`Available ${startDiff} months after start date`);
        } else {
          score -= 50; // Major penalty if not flexible
          issues.push('Available after required start date');
        }
      }
    }

    // 2. Duration Check
    // Simplified parsing for MVP
    if (student.duration && internship.lengthMin) {
      // Map string duration to approx months
      const studentMinMonths = this.parseDuration(student.duration);
      const internshipMinMonths = internship.lengthUnit === 'weeks' 
        ? (internship.lengthMin / 4) 
        : internship.lengthMin;

      if (studentMinMonths < (internshipMinMonths || 0)) {
        score -= 20;
        issues.push('Preferred duration shorter than minimum');
      }
    }

    return {
      score: Math.max(0, score),
      isAligned: score > 60,
      issues
    };
  }

  private parseDuration(duration: string): number {
    if (duration.includes('1-3')) return 1;
    if (duration.includes('3-6')) return 3;
    if (duration.includes('6+')) return 6;
    return 3; // Default
  }
}

export const availabilityScorer = new AvailabilityScorer();
