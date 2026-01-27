import { TUserEntity } from "../domain/user.entity";
import { TCreateUser } from "../schemas/create-user.schema";

export interface IUserRepository {
  create(user: TCreateUser): Promise<TUserEntity>;
}
