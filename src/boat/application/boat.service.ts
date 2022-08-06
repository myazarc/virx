import { Inject, Injectable } from '@nestjs/common';
import { IBoat } from '../domain/boat';
import { BoatRepository } from '../domain/boat.repository';
import { BoatTypeRepository } from '../domain/boattype.repository';
import { InjectionToken } from './injection.token';

@Injectable()
export class BoatService {
  constructor(
    @Inject(InjectionToken.BoatRepository)
    private readonly boatRepository: BoatRepository,
    @Inject(InjectionToken.BoatTypeRepository)
    private readonly boatTypeRepository: BoatTypeRepository,
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

  async boatTypeAll(): Promise<any> {
    try {
      return await this.boatTypeRepository.findAll();
    } catch (error) {
      throw error;
    }
  }

  async boatTypeCreate(boatType: any): Promise<any> {
    try {
      return await this.boatTypeRepository.create(boatType);
    } catch (error) {
      throw error;
    }
  }
}
