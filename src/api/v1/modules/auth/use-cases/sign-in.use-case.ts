import { compare } from "bcryptjs";
import { sign } from "hono/jwt";
import { IAuthRepository } from "../repositories/auth-repository.interface";
import { ApiError } from "@/api/v1/common/errors/api-error";
import { TSignIn } from "../schemas/sign-in.schema";

type TSignInOutput = {
  accessToken: string;
};

export class SignInUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(input: TSignIn): Promise<TSignInOutput> {
    const user = await this.authRepository.findByEmail(input.email);

    if (!user) {
      throw new ApiError("Invalid credentials", 401);
    }

    const isPasswordValid = await compare(input.password, user.passwordHash);

    if (!isPasswordValid) {
      throw new ApiError("Invalid credentials", 401);
    }

    const payload = {
      sub: user.id,
      name: user.name,
      email: user.email,
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7, // Expira em 7 dias
    };

    const secret = process.env.JWT_SECRET || "seu_segredo_aqui";
    const token = await sign(payload, secret);

    return {
      accessToken: token,
    };
  }
}
