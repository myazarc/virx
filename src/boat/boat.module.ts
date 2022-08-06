import { Module } from '@nestjs/common';
import { BoatController } from './application/boat.controller';
import { BoatService } from './application/boat.service';
import { InjectionToken } from './application/injection.token';
import { BoatRepositoryImplement } from './infrastructure/repository/boat.repository';

@Module({
  imports: [],
  controllers: [BoatController],
  providers: [
    BoatService,
    {
      provide: InjectionToken.BoatRepository,
      useClass: BoatRepositoryImplement,
    },
  ],
})
export class BoatModule {}
