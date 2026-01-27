import { DATABASE_PRISMA_URL, NODE_ENV } from "@/constants/env";
import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

const adapter = new PrismaPg({
  connectionString: DATABASE_PRISMA_URL,
});

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
  });

if (NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export { prisma };
