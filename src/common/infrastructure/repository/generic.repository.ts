import { IGenericRepository } from 'src/common/generic/IGenericRepository';
import { Repository, SelectQueryBuilder, UpdateResult } from 'typeorm';

export class GenericRepository<T> implements IGenericRepository<T> {
  constructor(private readonly repository: Repository<T>) {}

  findByAll(payload: T): Promise<T[]> {
    return this.repository.find(payload);
  }

  findByOne(query: T): Promise<T> {
    return this.repository.findOneBy(query);
  }

  update(query: T, payload: T): Promise<UpdateResult> {
    return this.repository.update(query, payload);
  }

  getQueryBuilder(): SelectQueryBuilder<T> {
    return this.repository.createQueryBuilder(
      this.repository.metadata.tableName,
    );
  }

  async findById(id: T): Promise<T> {
    return this.repository.findOneBy(id);
  }

  async findAll(): Promise<T[]> {
    return this.repository.find();
  }
  async create(entity: T): Promise<T> {
    const e = this.repository.create(entity);
    return this.repository.save(e);
  }
  async delete(id: T): Promise<T> {
    const entity = await this.repository.findOne(id);
    return this.repository.softRemove(entity);
  }
}
