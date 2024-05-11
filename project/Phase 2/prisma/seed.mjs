import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { faker } from "@faker-js/faker";

async function seed() {
  // Seed Addresses
  const addressData = Array.from({ length: 10 }).map(() => ({
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    country: faker.location.country(),
  }));

  const addresses = await prisma.address.createMany({ data: addressData });

  const addressIds = await getAddressIds();
  const customerData = Array.from({ length: 10 }).map((_, index) => ({
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    username: faker.internet.userName(),
    password: faker.internet.password(),
    balance: Math.floor(Math.random() * 10000), // Random balance between 100 and 10000
    addressId: addressIds[Math.floor(Math.random() * addressIds.length)], // Use index to get corresponding addressId
  }));

  const customers = await prisma.customer.createMany({ data: customerData });

  const sellerData = Array.from({ length: 5 }).map(() => ({
    companyName: faker.company.name(),
    userName: faker.internet.userName(),
    password: faker.internet.password(),
    bankAccount: faker.finance.accountNumber(),
  }));

  const sellers = await prisma.seller.createMany({ data: sellerData });

  // Seed Items
  const itemData = Array.from({ length: 20 }).map(() => ({
    name: faker.commerce.productName(),
    quantity: Math.floor(Math.random() * 10) + 1, // Random quantity up to 100
    image: faker.image.url(),
    price: parseFloat(faker.commerce.price()),
  }));

  const items = await prisma.item.createMany({ data: itemData });

  // Seed Purchases
  const sellersIds = await getSellersIds();
  const customerIds = await getCustomersIds();
  const itemsIds = await getitemIds();
  const purchaseData = Array.from({ length: 30 }).map(() => {
    return {
      customerId: customerIds[Math.floor(Math.random() * customerIds.length)],
      itemId: itemsIds[Math.floor(Math.random() * itemsIds.length)],
      sellerId: sellersIds[Math.floor(Math.random() * sellersIds.length)],
      quantity: Math.floor(Math.random() * 10) + 1, // Random quantity between 1 and 10
      totalPrice: parseFloat(faker.commerce.price()),
    };
  });

  await prisma.purchase.createMany({ data: purchaseData });
}

seed().catch((error) => {
  console.error(error);
});

async function getAddressIds() {
  try {
    const addresses = await prisma.address.findMany({
      select: {
        id: true,
      },
    });

    const addressIds = addresses.map((address) => address.id);
    return addressIds;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function getSellersIds() {
  try {
    const sellers = await prisma.seller.findMany({
      select: {
        id: true,
      },
    });

    const sellerIds = sellers.map((seller) => seller.id);
    return sellerIds;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function getCustomersIds() {
  try {
    const sellers = await prisma.customer.findMany({
      select: {
        id: true,
      },
    });

    const sellerIds = sellers.map((seller) => seller.id);
    return sellerIds;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    await prisma.$disconnect();
  }
}

async function getitemIds() {
  try {
    const sellers = await prisma.item.findMany({
      select: {
        id: true,
      },
    });

    const sellerIds = sellers.map((seller) => seller.id);
    return sellerIds;
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    await prisma.$disconnect();
  }
}
