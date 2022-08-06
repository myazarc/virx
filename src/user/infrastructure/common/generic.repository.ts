import { IGenericRepository } from 'src/user/domain/common/IGenericRepository';
import { Repository, UpdateResult } from 'typeorm';

export class GenericRepository<T> implements IGenericRepository<T> {
  constructor(private readonly repository: Repository<T>) {}

  findByOne(query: T): Promise<T> {
    return this.repository.findOneBy(query);
  }

  update(query: T, payload: T): Promise<UpdateResult> {
    return this.repository.update(query, payload);
  }

  async findById(id: T): Promise<T> {
    return this.repository.findOneBy(id);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }
  async create(entity: T): Promise<T> {
    return this.repository.save(entity);
  }
  async delete(id: T): Promise<T> {
    const entity = await this.repository.findOne(id);
    return this.repository.softRemove(entity);
  }
}
