import { Inject, Injectable } from '@nestjs/common';
import { IBoat } from '../domain/boat';
import { BoatRepository } from '../domain/boat.repository';
import { InjectionToken } from './injection.token';

@Injectable()
export class BoatService {
  constructor(
    @Inject(InjectionToken.BoatRepository)
    private readonly boatRepository: BoatRepository,
  ) {}

  async all(): Promise<IBoat[]> {
    try {
      return await this.boatRepository.findByAll({
        isActive: true,
      } as IBoat);
    } catch (error) {
      throw error;
    }
  }

  async create(boat: any): Promise<any> {
    try {
      return await this.boatRepository.create(boat);
    } catch (error) {
      throw error;
    }
  }
}
