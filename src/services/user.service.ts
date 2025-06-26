import { Prisma } from '@prisma';
import { prisma } from '../config/database';
import bcrypt from 'bcrypt';

export const getAllUsers = async () => {
  return prisma.users.findMany();
};

export const getUserById = async (id: string) => {
  return prisma.users.findUnique({ where: { id } });
};

export const getUserByEmail = async (email: string) => {
  return prisma.users.findUnique({ where: { email } });
};

export const registerUser = async (
  data: Omit<Prisma.usersCreateInput, 'password'> & { password: string }
) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  return prisma.users.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};

export const updateUser = async (id: string, data: Partial<Prisma.usersUpdateInput>) => {
  return prisma.users.update({
    where: { id },
    data,
  });
};

export const deleteUser = async (id: string) => {
  return prisma.users.delete({
    where: { id },
  });
};
