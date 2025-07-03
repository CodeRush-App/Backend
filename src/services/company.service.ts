import { Prisma } from '@prisma';
import { prisma } from '../config/database';
import { registerUser } from './user.service';

export const getAllCompanies = async () => {
  return prisma.companies.findMany();
};

export const getCompanyById = async (id: string) => {
  return prisma.companies.findUnique({ where: { id } });
};

export const createCompany = async (data: Prisma.companiesCreateInput) => {
  return prisma.companies.create({ data });
};

export const createCompanyWithManager = async (
  userData: { username: string; email: string; password: string },
  companyData: Prisma.companiesCreateInput
) => {
  let result;
  await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const user = await registerUser(
      {
        username: userData.username,
        email: userData.email,
        password: userData.password,
        provider: 'credentials',
      },
      tx
    );
    result = await tx.companies.create({
      data: {
        name: companyData.name,
        managedBy: user.id,
      },
    });
  });
  return result;
};

export const updateCompany = async (id: string, data: Partial<Prisma.companiesUpdateInput>) => {
  return prisma.companies.update({ where: { id }, data });
};

export const deleteCompany = async (id: string) => {
  return prisma.companies.delete({ where: { id } });
};
