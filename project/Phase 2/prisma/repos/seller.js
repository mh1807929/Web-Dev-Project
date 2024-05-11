import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export async function get(userName) {
    return await prisma.seller.findMany({
      where: {
        userName: userName
      }
    });
  }


  export async function create(data) {
    return await prisma.seller.create({
      data: data
    });
  }


  export async function update(id, data) {
    return await prisma.seller.update({
      where: {
        id: id
      },
      data: data
    });
  }


  export async function remove(id){
    return await prisma.seller.delete({
      where: {
        id: id
      }
    });
  }


