import { Injectable } from '@nestjs/common';

import { ElasticsearchService } from '@nestjs/elasticsearch';
import { IBooking } from '../domain/booking';

@Injectable()
export class BookingElasticService {
  indexName = 'booking';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async cretaeBooking(booking: IBooking) {
    return this.elasticsearchService.index<IBooking>({
      index: this.indexName,
      body: booking,
    });
  }
}
