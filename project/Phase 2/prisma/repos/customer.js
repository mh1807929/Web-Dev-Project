import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getCustomerByName(userName) {
  return await prisma.customer.findMany({
    where: {
      username: userName,
    },
  });
}

export async function createCustomer(data) {
  return await prisma.customer.create({
    data: data,
  });
}

export async function updateCustomer(id, data) {
  return await prisma.customer.update({
    where: {
      id: id,
    },
    data: data,
  });
}

export async function deleteCustomer(id) {
  return await prisma.customer.delete({
    where: {
      id: id,
    },
  });
}
