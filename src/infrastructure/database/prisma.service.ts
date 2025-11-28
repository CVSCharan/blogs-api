import { getPrismaClient, disconnectPrisma } from "@cvscharan/blogs-db";

export class PrismaService {
  public client = getPrismaClient();

  async onModuleDestroy() {
    await disconnectPrisma();
  }
}

export const prisma = new PrismaService().client;
