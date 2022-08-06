import { Module } from '@nestjs/common';
import { InjectionToken } from './application/injection.token';
import { LocationController } from './application/location.controller';
import { LocationService } from './application/location.service';
import { LocationRepositoryImplement } from './infrastructure/repository/location.repository';

@Module({
  imports: [],
  controllers: [LocationController],
  providers: [
    LocationService,
    {
      provide: InjectionToken.LocationRepository,
      useClass: LocationRepositoryImplement,
    },
  ],
})
export class LocationModule {}
