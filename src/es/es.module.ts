import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ElasticsearchModule } from '@nestjs/elasticsearch';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ElasticsearchModule.register({
      node: process.env.ES_HOST,
    }),
  ],
  exports: [ElasticsearchModule],
})
export class EsModule {}
