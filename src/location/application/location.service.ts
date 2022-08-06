import { Inject, Injectable } from '@nestjs/common';
import { ILocation } from '../domain/location';
import { LocationRepository } from '../domain/location.repository';
import { InjectionToken } from './injection.token';

@Injectable()
export class LocationService {
  constructor(
    @Inject(InjectionToken.LocationRepository)
    private readonly locationRepository: LocationRepository,
  ) {}

  async all(): Promise<any> {
    try {
      return await this.locationRepository.findByAll({
        isActive: true,
      } as ILocation);
    } catch (error) {
      throw error;
    }
  }

  async create(location: any): Promise<any> {
    try {
      return await this.locationRepository.create(location);
    } catch (error) {
      throw error;
    }
  }
}
