import { UpdateResult } from 'typeorm';

export interface IGenericRepository<T> {
  findById(id: T): Promise<T>;
  findByOne(query: any): Promise<T>;
  findAll(): Promise<T[]>;
  findByAll(payload: T): Promise<T[]>;
  create(payload: T): Promise<T>;
  update(query: T, payload: T): Promise<UpdateResult>;
  delete(id: T): Promise<T>;
}
