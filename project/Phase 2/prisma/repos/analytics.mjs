import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const totalAmountPerProductPerYear = await prisma.purchase.groupBy({
  by: [{ itemId: true }, { date: { year: true } }],
  _sum: { totalPrice: true }
});

console.log(totalAmountPerProductPerYear)
// const buyersPerLocation = await prisma.address.groupBy({
//   by: ["city", "country"],
//   _count: { distinct: { customerId: true } },
// });

// const sixMonthsAgo = new Date();
// sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

// const mostBoughtProducts = await prisma.purchase.groupBy({
//   by: ["itemId"],
//   where: { date: { gte: sixMonthsAgo } },
//   _count: true,
//   _orderBy: { _count: "desc" },
//   _take: 3,
// });

// const purchasedProductIds = (await prisma.purchase.findMany()).map(
//   (purchase) => purchase.itemId
// );
// const productsNeverPurchased = await prisma.item.findMany({
//   where: { NOT: { id: { in: purchasedProductIds } } },
// });

// const totalRevenuePerMonth = await prisma.purchase.groupBy({
//   by: { month: { date: true } },
//   _sum: { totalPrice: true },
// });

// const lastMonth = new Date();
// lastMonth.setMonth(lastMonth.getMonth() - 1);

// const totalRevenueLastMonth = await prisma.purchase.aggregate({
//   where: { date: { gte: lastMonth } },
//   _sum: { totalPrice: true },
// });
// const totalOrdersLastMonth = await prisma.purchase.count({
//   where: { date: { gte: lastMonth } },
// });

// const averageOrderValueLastMonth =
//   totalOrdersLastMonth > 0 ? totalRevenueLastMonth / totalOrdersLastMonth : 0;
