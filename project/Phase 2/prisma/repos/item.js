import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export async function getItemByName(name) {
    return await prisma.item.findMany({
      where: {
        name:name
      }
    });
  }


  export async function createItem(data) {
    return await prisma.item.create({
      data: data
    });
  }


  export async function updateItem  (id, data) {
    return await prisma.item.update({
      where: {
        id: id
      },
      data: data
    });
  }


  export async function deleteItem (id){
    return await prisma.item.delete({
      where: {
        id: id
      }
    });
  }


