import { prisma } from "@/lib/prisma";
import { ChurchRepository } from "../repositories/church-repository.interface";
import { Church } from "../schemas/member.schema";
import { CreateChurch } from "../schemas/create-church.schema";

export class PrismaChurchRepository implements ChurchRepository {
  async create(church: CreateChurch): Promise<Church> {
    const churchCreated = await prisma.church.create({
      data: church,
    });

    return churchCreated;
  }
}
