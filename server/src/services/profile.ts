import { prisma } from '../db/client.js';
import { Prisma } from '@prisma/client';

export const profileService = {
  /**
   * Get profile by user ID with all relations
   */
  async getProfileByUserId(userId: string) {
    return prisma.profile.findUnique({
      where: { userId },
      include: {
        skills: true,
        projects: true,
      },
    });
  },

  /**
   * Create or update profile
   */
  async updateProfile(userId: string, data: any) {
    // Extract relations to handle separately if needed
    // For simple updates, we can pass data directly if it matches schema
    // But we need to be careful with JSON fields and arrays
    
    const { skills, projects, ...profileData } = data;

    // Ensure arrays are properly formatted
    if (profileData.roleTypes && !Array.isArray(profileData.roleTypes)) delete profileData.roleTypes;
    if (profileData.industries && !Array.isArray(profileData.industries)) delete profileData.industries;
    if (profileData.learningGoals && !Array.isArray(profileData.learningGoals)) delete profileData.learningGoals;
    if (profileData.locationPrefs && !Array.isArray(profileData.locationPrefs)) delete profileData.locationPrefs;

    return prisma.profile.upsert({
      where: { userId },
      create: {
        userId,
        ...profileData,
        name: profileData.name || 'New Student', // Default name if missing
      },
      update: {
        ...profileData,
      },
      include: {
        skills: true,
        projects: true,
      },
    });
  },

  /**
   * Update skills for a profile
   */
  async updateSkills(userId: string, skills: any[]) {
    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new Error('Profile not found');

    // Transaction to replace skills
    return prisma.$transaction(async (tx) => {
      // Delete existing skills
      await tx.skill.deleteMany({ where: { profileId: profile.id } });

      // Create new skills
      if (skills.length > 0) {
        await tx.skill.createMany({
          data: skills.map((s) => ({
            profileId: profile.id,
            name: s.name,
            category: s.category,
            proficiency: s.proficiency,
            hasProof: s.hasProof,
            proofs: s.proofs || [],
          })),
        });
      }

      return tx.profile.findUnique({
        where: { id: profile.id },
        include: { skills: true },
      });
    });
  },
};
