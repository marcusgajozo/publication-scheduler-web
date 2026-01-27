import { TUserEntity } from "../../users/domain/user.entity";

export interface IAuthRepository {
  findByEmail(email: string): Promise<TUserEntity | null>;
}
