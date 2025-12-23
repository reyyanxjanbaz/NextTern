import { prisma } from '../db/client.js';

export const projectService = {
  async getProjectsByUserId(userId: string) {
    return prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  },

  async createProject(userId: string, data: any) {
    // Get profile ID
    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) throw new Error('Profile not found');

    return prisma.project.create({
      data: {
        userId,
        profileId: profile.id,
        ...data,
      },
    });
  },

  async updateProject(userId: string, projectId: string, data: any) {
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project || project.userId !== userId) {
      throw new Error('Project not found or unauthorized');
    }

    return prisma.project.update({
      where: { id: projectId },
      data,
    });
  },

  async deleteProject(userId: string, projectId: string) {
    const project = await prisma.project.findUnique({ where: { id: projectId } });
    if (!project || project.userId !== userId) {
      throw new Error('Project not found or unauthorized');
    }

    return prisma.project.delete({
      where: { id: projectId },
    });
  },
};
