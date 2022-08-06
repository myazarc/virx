import { IGenericRepository } from 'src/common/generic/IGenericRepository';
import { IUser } from './user';

export interface UserRepository extends IGenericRepository<IUser> {
  findByEmail(email: string): Promise<IUser>;
}
