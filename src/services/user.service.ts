import { Prisma } from '@prisma';
import { prisma, PrismaClient } from '../config/database';
import bcrypt from 'bcrypt';

export const getAllUsers = async () => {
  const users = await prisma.users.findMany();

  return users.map((user: any) => {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
  });
};

export const getUserById = async (id: string) => {
  const user = await prisma.users.findUnique({ where: { id } });
  if (!user) return null;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const getUserByEmail = async (email: string) => {
  return prisma.users.findUnique({ where: { email } });
};

export const checkUserExistsByEmail = async (email: string) => {
  const user = await prisma.users.findUnique({
    where: { email },
    select: { id: true, provider: true, password: true },
  });
  if (!user) return null;
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const getAllUserScores = async () => {
  const users = await prisma.users.findMany({
    select: { id: true, username: true, score: true, elo: true, country: true },
  });
  return users;
};

export const registerUser = async (
  data: Omit<Prisma.usersCreateInput, 'password'> & { password: string },
  client: PrismaClient | Prisma.TransactionClient = prisma
) => {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await client.users.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
  // Remove password from returned user
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const updateUser = async (id: string, data: Partial<Prisma.usersUpdateInput>) => {
  let updateData = { ...data };
  if (data.password) {
    updateData.password = await bcrypt.hash(data.password as string, 10);
  }
  const user = await prisma.users.update({
    where: { id },
    data: updateData,
  });
  // Remove password from returned user
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};

export const deleteUser = async (id: string) => {
  const user = await prisma.users.delete({
    where: { id },
  });
  // Remove password from returned user
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword;
};
