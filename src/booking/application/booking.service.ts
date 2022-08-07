import { Inject, Injectable } from '@nestjs/common';
import { BoatRepository } from 'src/boat/domain/boat.repository';
import { BookingRepository } from '../domain/booking.repository';
import { InjectionToken } from './injection.token';
import * as dayjs from 'dayjs';
import { BoatElasticService } from 'src/boat/application/boat.elastic.service';

@Injectable()
export class BookingService {
  constructor(
    private readonly boatElasticService: BoatElasticService,
    @Inject(InjectionToken.BookingRepository)
    private readonly bookingRepository: BookingRepository,
    @Inject(InjectionToken.BoatRepository)
    private readonly boatRepository: BoatRepository,
  ) {}

  async integrateForEs(): Promise<any> {
    const boats = await this.all();
    boats.forEach(async (element) => {
      await this.boatElasticService.boatAddAvaible(element.boat.id, {
        user: element.user.id,
        startDate: new Date(element.startDate),
        endDate: new Date(element.endDate),
      });
    });
  }

  async all(): Promise<any> {
    try {
      return await this.bookingRepository.findByAll({
        relations: ['boat', 'user'],
      } as any);
    } catch (error) {
      throw error;
    }
  }

  async create(booking: any): Promise<any> {
    try {
      const bookingRes = await this.bookingRepository.create(booking);
      if (bookingRes) {
        await this.boatElasticService.boatAddAvaible(bookingRes.boat, {
          user: bookingRes.user,
          startDate: bookingRes.startDate,
          endDate: bookingRes.endDate,
        });
      }
      return bookingRes;
    } catch (error) {
      throw error;
    }
  }

  async getBoat(id: number): Promise<any> {
    try {
      return await this.boatRepository.findById({ id, isActive: true } as any);
    } catch (error) {
      throw error;
    }
  }

  async boatIsAvailable(
    boat: number,
    startDate: Date,
    endDate: Date,
  ): Promise<any> {
    try {
      const sDate = dayjs(startDate).format('YYYY-MM-DD');
      const eDate = dayjs(endDate).format('YYYY-MM-DD');
      return await this.bookingRepository.isAvailable(
        boat,
        sDate as unknown as Date,
        eDate as unknown as Date,
      );
    } catch (error) {
      throw error;
    }
  }

  getDayCount(startDate: Date, endDate: Date): number {
    const start = dayjs(startDate);
    const end = dayjs(endDate);
    return end.diff(start, 'day');
  }
}
