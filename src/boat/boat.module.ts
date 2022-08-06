import { Module } from '@nestjs/common';
import { BoatController } from './application/boat.controller';
import { BoatService } from './application/boat.service';
import { InjectionToken } from './application/injection.token';
import { BoatRepositoryImplement } from './infrastructure/repository/boat.repository';
import { BoatTypeRepositoryImplement } from './infrastructure/repository/boattype.repository';

@Module({
  imports: [],
  controllers: [BoatController],
  providers: [
    BoatService,
    {
      provide: InjectionToken.BoatRepository,
      useClass: BoatRepositoryImplement,
    },
    {
      provide: InjectionToken.BoatTypeRepository,
      useClass: BoatTypeRepositoryImplement,
    },
  ],
})
export class BoatModule {}
