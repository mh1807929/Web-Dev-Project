import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export async function get(name) {
    return await prisma.item.findMany({
      where: {
        name:name
      }
    });
  }


  export async function create(data) {
    return await prisma.item.create({
      data: data
    });
  }


  export async function update (id, data) {
    return await prisma.item.update({
      where: {
        id: id
      },
      data: data
    });
  }


  export async function remove(id){
    return await prisma.item.delete({
      where: {
        id: id
      }
    });
  }


