import { PrismaClient, Internship, Prisma } from '@prisma/client';
import { InternshipCard, InternshipCardExpanded } from '../../../shared/types/internship-card';
import { CardState } from '../../../shared/types/card';

const prisma = new PrismaClient();

export class InternshipService {
  /**
   * Create a new internship
   */
  async createInternship(recruiterId: string, data: InternshipCardExpanded): Promise<Internship> {
    // First, ensure the recruiter has a company
    const recruiter = await prisma.user.findUnique({
      where: { id: recruiterId },
      include: { company: true },
    });

    if (!recruiter || !recruiter.companyId) {
      throw new Error('Recruiter must be associated with a company to post internships');
    }

    // Map the expanded card data to the Prisma model
    const internshipData: Prisma.InternshipCreateInput = {
      recruiter: { connect: { id: recruiterId } },
      company: { connect: { id: recruiter.companyId } },
      
      // Role Clarity
      title: data.role.title,
      team: data.role.team,
      purpose: data.role.purpose,
      responsibilities: data.role.responsibilities,
      collaboration: data.role.collaboration,
      
      // Learning Outcomes
      skillsToLearn: data.learning.skills,
      projectTypes: data.learning.projectTypes,
      mentorshipAvailable: data.learning.mentorship.available,
      mentorshipDetails: data.learning.mentorship.description,
      growthOpportunities: data.learning.growthOpportunities,
      
      // Practical Expectations
      requiredSkills: data.expectations.requiredSkills as any, // JSON
      preferredSkills: data.expectations.preferredSkills,
      educationLevel: data.expectations.education?.level,
      educationFields: data.expectations.education?.fields || [],
      workAuthorization: data.expectations.workAuthorization,
      otherRequirements: data.expectations.otherRequirements,
      
      // Compensation
      compensationType: data.compensation.type,
      compensationAmount: data.compensation.amount as any, // JSON
      benefits: data.compensation.benefits,
      
      // Duration & Timing
      startDate: data.duration.startDate instanceof Date ? data.duration.startDate : undefined,
      startDateFlexible: data.duration.startDate === 'flexible',
      lengthMin: data.duration.length.min,
      lengthMax: data.duration.length.max,
      lengthUnit: data.duration.length.unit,
      hoursPerWeekMin: data.duration.hoursPerWeek.min,
      hoursPerWeekMax: data.duration.hoursPerWeek.max,
      arrangement: data.duration.arrangement,
      location: data.duration.location,
      
      // Metadata
      state: 'ACTIVE', // Default to active for now
      publishedAt: new Date(),
    };

    return prisma.internship.create({
      data: internshipData,
    });
  }

  /**
   * Get internship by ID
   */
  async getInternship(id: string): Promise<Internship | null> {
    return prisma.internship.findUnique({
      where: { id },
      include: { company: true },
    });
  }

  /**
   * Get all internships for a recruiter
   */
  async getRecruiterInternships(recruiterId: string): Promise<Internship[]> {
    return prisma.internship.findMany({
      where: { recruiterId },
      orderBy: { updatedAt: 'desc' },
      include: { company: true },
    });
  }

  /**
   * Update an internship
   */
  async updateInternship(id: string, data: Partial<InternshipCardExpanded>): Promise<Internship> {
    const updateData: Prisma.InternshipUpdateInput = {};

    if (data.role) {
      updateData.title = data.role.title;
      updateData.team = data.role.team;
      updateData.purpose = data.role.purpose;
      updateData.responsibilities = data.role.responsibilities;
      updateData.collaboration = data.role.collaboration;
    }

    if (data.learning) {
      updateData.skillsToLearn = data.learning.skills;
      updateData.projectTypes = data.learning.projectTypes;
      updateData.mentorshipAvailable = data.learning.mentorship.available;
      updateData.mentorshipDetails = data.learning.mentorship.description;
      updateData.growthOpportunities = data.learning.growthOpportunities;
    }

    if (data.expectations) {
      updateData.requiredSkills = data.expectations.requiredSkills as any;
      updateData.preferredSkills = data.expectations.preferredSkills;
      if (data.expectations.education) {
        updateData.educationLevel = data.expectations.education.level;
        updateData.educationFields = data.expectations.education.fields;
      }
      updateData.otherRequirements = data.expectations.otherRequirements;
    }

    if (data.compensation) {
      updateData.compensationType = data.compensation.type;
      updateData.compensationAmount = data.compensation.amount as any;
      updateData.benefits = data.compensation.benefits;
    }

    if (data.duration) {
      updateData.startDate = data.duration.startDate instanceof Date ? data.duration.startDate : undefined;
      updateData.startDateFlexible = data.duration.startDate === 'flexible';
      updateData.lengthMin = data.duration.length.min;
      updateData.lengthMax = data.duration.length.max;
      updateData.lengthUnit = data.duration.length.unit;
      updateData.hoursPerWeekMin = data.duration.hoursPerWeek.min;
      updateData.hoursPerWeekMax = data.duration.hoursPerWeek.max;
      updateData.arrangement = data.duration.arrangement;
      updateData.location = data.duration.location;
    }

    return prisma.internship.update({
      where: { id },
      data: updateData,
    });
  }

  /**
   * Delete an internship
   */
  async deleteInternship(id: string): Promise<void> {
    await prisma.internship.delete({
      where: { id },
    });
  }
}

export const internshipService = new InternshipService();
