import { PrismaChurchRepository } from "../infra/prisma-user.repository";
import { CreateChurchUseCase } from "../use-cases/create-church.use-case";

export class ChurchFactory {
  static makeCreateChurch() {
    const churchRepository = new PrismaChurchRepository();
    return new CreateChurchUseCase(churchRepository);
  }
}
