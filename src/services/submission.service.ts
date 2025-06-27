import { Prisma } from '@prisma';
import { prisma } from '../config/database';

export const getAllSubmissions = async () => {
  return prisma.submissions.findMany();
};

export const getAllSubmissionsByUser = async (userId: string) => {
  return prisma.submissions.findMany({ where: { userId } });
};

export const getSubmissionsByUserAndProblem = async (userId: string, problemId: string) => {
  return prisma.submissions.findMany({ where: { userId, problemId } });
};

export const getSubmissionById = async (id: string) => {
  return prisma.submissions.findUnique({ where: { id } });
};

export const createSubmission = async (data: Prisma.submissionsCreateInput) => {
  const updateData = { ...data, submissionDate: new Date() };
  return prisma.submissions.create({ data: updateData });
};

export const updateSubmissionById = async (
  id: string,
  data: Partial<Prisma.submissionsUpdateInput>
) => {
  return prisma.submissions.update({ where: { id }, data });
};

export const deleteSubmissionById = async (id: string) => {
  return prisma.submissions.delete({ where: { id } });
};
