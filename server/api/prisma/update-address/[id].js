import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const result = await prisma.addresses.update({
    where: { id: Number(event.context.params.id) },
    data: {
      name: body.name,
      address: body.address,
      zipcode: body.zipCode,
      city: body.city,
      country: body.country,
    },
  });
  return result;
});
