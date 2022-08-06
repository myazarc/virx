import { Inject, Injectable } from '@nestjs/common';
import { BoatSearchRequestDto } from 'src/common/dto/boat.search.request.dto';
import { IBoat } from '../domain/boat';
import { BoatRepository } from '../domain/boat.repository';
import { BoatTypeRepository } from '../domain/boattype.repository';
import { InjectionToken } from './injection.token';
import * as dayjs from 'dayjs';
import { Between } from 'typeorm';

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

  async search(params: BoatSearchRequestDto): Promise<any> {
    try {
      const sDate = dayjs(params.startDate).format('YYYY-MM-DD');
      const eDate = dayjs(params.endDate).format('YYYY-MM-DD');
      const where = {
        bookings: {
          startDate: sDate,
          endDate: eDate,
        },

        location: parseInt(params.location as unknown as string, 10),
      } as any;
      if (params?.priceStart && params?.priceEnd) {
        where.price = Between(params.priceStart, params.priceEnd);
      }
      if (params?.isCrewed) {
        where.isCrewed = params.isCrewed;
      }
      if (params?.type) {
        where.type = params.type;
      }

      if (params?.personCapacityStart && params?.personCapacityEnd) {
        where.personCapacity = Between(
          params.personCapacityStart,
          params.personCapacityEnd,
        );
      }
      return await this.boatRepository.search(where);
    } catch (error) {
      throw error;
    }
  }
}
