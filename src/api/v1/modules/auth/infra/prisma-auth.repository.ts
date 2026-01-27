import { prisma } from "@/lib/prisma";

import { IAuthRepository } from "../repositories/auth-repository.interface";
import { TSignIn } from "../schemas/sign-in.schema";
import { TUserEntity } from "../../users/domain/user.entity";

export class PrismaAuthRepository implements IAuthRepository {
  async findByEmail(email: TSignIn["email"]): Promise<TUserEntity | null> {
    const prismaUser = await prisma.user.findUnique({ where: { email } });
    if (!prismaUser) return null;

    return prismaUser;
  }
}
