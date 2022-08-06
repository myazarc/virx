import { IGenericRepository } from './common/IGenericRepository';
import { IUser } from './user';

export interface UserRepository extends IGenericRepository<IUser> {
  findByEmail(email: string): Promise<IUser>;
}
