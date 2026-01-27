import { prisma } from "@/lib/prisma";
import { TUserEntity } from "../domain/user.entity";
import { IUserRepository } from "../repositories/user-repository.interface";

export class PrismaUserRepository implements IUserRepository {
  async create(user: TUserEntity): Promise<TUserEntity> {
    const userCreated = await prisma.user.create({
      data: user,
    });

    return userCreated;
  }
}
