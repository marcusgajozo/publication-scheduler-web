import { ApiError } from "@/api/v1/common/errors/api-error";
import { hash } from "bcryptjs";
import { IUserRepository } from "../../users/repositories/user-repository.interface";
import { IAuthRepository } from "../repositories/auth-repository.interface";
import { TSignUp } from "../schemas/sign-up.schema";

type SignUpOutput = {
  id: string;
  email: string;
};

export class SignUpUseCase {
  constructor(
    private authRepository: IAuthRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(input: TSignUp): Promise<SignUpOutput> {
    const user = await this.authRepository.findByEmail(input.email);

    if (user) {
      throw new ApiError("User already exists", 409);
    }

    const passwordHash = await hash(input.password, 10);

    const newUser = await this.userRepository.create({
      name: input.name,
      email: input.email,
      passwordHash,
    });

    return {
      id: newUser.id,
      email: newUser.email,
    };
  }
}
