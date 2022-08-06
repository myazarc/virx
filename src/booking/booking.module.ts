import { Module } from '@nestjs/common';
import { BoatModule } from 'src/boat/boat.module';
import { BookingController } from './application/booking.controller';
import { BookingService } from './application/booking.service';
import { InjectionToken } from './application/injection.token';
import { BookingRepositoryImplement } from './infrastructure/repository/booking.repository';

@Module({
  imports: [BoatModule],
  controllers: [BookingController],
  providers: [
    BookingService,
    {
      provide: InjectionToken.BookingRepository,
      useClass: BookingRepositoryImplement,
    },
  ],
})
export class BookingModule {}
