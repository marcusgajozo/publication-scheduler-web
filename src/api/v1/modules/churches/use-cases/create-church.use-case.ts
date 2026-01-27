import { ChurchRepository } from "../repositories/church-repository.interface";
import { CreateChurch } from "../schemas/create-church.schema";

type CreateChurchOutput = {
  id: string;
};

export class CreateChurchUseCase {
  constructor(private churchRepository: ChurchRepository) {}

  async execute(input: CreateChurch): Promise<CreateChurchOutput> {
    const church = await this.churchRepository.create({ name: input.name });

    return {
      id: church.id,
    };
  }
}
