import { InjectDataSource } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/domain/user.repository';
import { DataSource } from 'typeorm';
import { GenericRepository } from 'src/common/infrastructure/repository/generic.repository';
import { UserEntity } from '../entity/user.entity';

export class UserRepositoryImplement
  extends GenericRepository<UserEntity>
  implements UserRepository
{
  constructor(@InjectDataSource() readonly dataSource: DataSource) {
    const userRepository = dataSource.getRepository(UserEntity);
    super(userRepository);
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const entity = new UserEntity();
    entity.email = email;
    return await this.findByOne(entity);
  }
}
