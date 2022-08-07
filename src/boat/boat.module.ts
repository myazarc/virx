import { Module } from '@nestjs/common';
import { EsModule } from 'src/es/es.module';
import { BoatController } from './application/boat.controller';
import { BoatElasticService } from './application/boat.elastic.service';
import { BoatService } from './application/boat.service';
import { InjectionToken } from './application/injection.token';
import { BoatRepositoryImplement } from './infrastructure/repository/boat.repository';
import { BoatTypeRepositoryImplement } from './infrastructure/repository/boattype.repository';

@Module({
  imports: [EsModule],
  controllers: [BoatController],
  providers: [
    BoatService,
    BoatElasticService,
    {
      provide: InjectionToken.BoatRepository,
      useClass: BoatRepositoryImplement,
    },
    {
      provide: InjectionToken.BoatTypeRepository,
      useClass: BoatTypeRepositoryImplement,
    },
  ],
  exports: [
    {
      provide: InjectionToken.BoatRepository,
      useClass: BoatRepositoryImplement,
    },
    BoatElasticService,
  ],
})
export class BoatModule {}
