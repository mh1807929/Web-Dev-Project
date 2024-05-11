import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function get(userName) {
  return await prisma.customer.findMany({
    where: {
      username: userName,
    },
  });
}

export async function create(data) {
  return await prisma.customer.create({
    data: data,
  });
}

export async function update(id, data) {
  return await prisma.customer.update({
    where: {
      id: id,
    },
    data: data,
  });
}

export async function remove(id) {
  return await prisma.customer.delete({
    where: {
      id: id,
    },
  });
}
