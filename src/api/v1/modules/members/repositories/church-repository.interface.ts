import { Church } from "../schemas/member.schema";
import { CreateChurch } from "../schemas/create-church.schema";

export interface ChurchRepository {
  create(church: CreateChurch): Promise<Church>;
}
