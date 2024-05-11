import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export async function getSellerByName(userName) {
    return await prisma.seller.findMany({
      where: {
        userName: userName
      }
    });
  }


  export async function createSeller(data) {
    return await prisma.seller.create({
      data: data
    });
  }


  export async function updateSeller  (id, data) {
    return await prisma.seller.update({
      where: {
        id: id
      },
      data: data
    });
  }


  export async function deleteSeller(id){
    return await prisma.seller.delete({
      where: {
        id: id
      }
    });
  }


