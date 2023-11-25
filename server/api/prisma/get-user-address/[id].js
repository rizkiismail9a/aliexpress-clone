import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const result = await prisma.addresses.findFirst({
    where: { userId: event.context.params.id },
  });
  return result;
});
