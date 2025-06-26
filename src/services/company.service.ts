import { Prisma } from '@prisma';
import { prisma } from '../config/database';

export const getAllCompanies = async () => {
  return prisma.companies.findMany();
};

export const getCompanyById = async (id: string) => {
  return prisma.companies.findUnique({ where: { id } });
};

export const createCompany = async (data: Prisma.companiesCreateInput) => {
  return prisma.companies.create({ data });
};

export const updateCompany = async (id: string, data: Partial<Prisma.companiesUpdateInput>) => {
  return prisma.companies.update({ where: { id }, data });
};

export const deleteCompany = async (id: string) => {
  return prisma.companies.delete({ where: { id } });
};
