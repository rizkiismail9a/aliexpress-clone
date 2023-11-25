import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  let results = await prisma.products.findMany({
    take: 5, // jumlah maksimum yang diambil dari hasil cari
    where: {
      name: {
        contains: event.context.params.id,
        mode: "insensitive",
      },
    },
  });
  return results;
});
