import { PrismaAuthRepository } from "../infra/prisma-auth.repository";
import { PrismaUserRepository } from "../../users/infra/prisma-user.repository";
import { SignInUseCase } from "../use-cases/sign-in.use-case";
import { SignUpUseCase } from "../use-cases/sign-up.use-case";

export class AuthFactory {
  static makeSignUp() {
    const authRepository = new PrismaAuthRepository();
    const userRepository = new PrismaUserRepository();
    return new SignUpUseCase(authRepository, userRepository);
  }

  static makeSignIn() {
    const repository = new PrismaAuthRepository();
    return new SignInUseCase(repository);
  }
}
