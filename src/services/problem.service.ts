import { Prisma } from '@prisma';
import { prisma } from '../config/database';

export const getAllProblems = async () => {
  return prisma.problems.findMany();
};

export const getProblemById = async (id: string) => {
  return prisma.problems.findUnique({ where: { id } });
};

export const createProblem = async (data: Prisma.problemsCreateInput) => {
  return prisma.problems.create({ data });
};

export const updateProblem = async (id: string, data: Partial<Prisma.problemsUpdateInput>) => {
  const updateData = { ...data, updatedAt: new Date() };
  return prisma.problems.update({ where: { id }, data: updateData });
};

export const deleteProblem = async (id: string) => {
  return prisma.problems.delete({ where: { id } });
};
