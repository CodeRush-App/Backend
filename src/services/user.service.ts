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
  let updateData = { ...data };
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password as string, 10);
  }
  return prisma.users.update({
    where: { id },
    data: updateData,
  });
};

export const deleteUser = async (id: string) => {
  return prisma.users.delete({
    where: { id },
  });
};
