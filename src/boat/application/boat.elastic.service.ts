import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import * as dayjs from 'dayjs';
import { BoatSearchRequestDto } from 'src/common/dto/boat.search.request.dto';

interface BoatAvaible {
  user: number;
  startDate: Date;
  endDate: Date;
}

interface BoatBody {
  id: number;
  name: string;
  type: number;
  price: number;
  location: number;
  prePaymentRate: number;
  personCapacity: number;
  isCrewed: boolean;
  avaibles: BoatAvaible[];
}

@Injectable()
export class BoatElasticService {
  indexName = 'boats';

  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  async createBoat(boat: any) {
    return this.elasticsearchService.index<BoatBody>({
      index: this.indexName,
      id: boat.id,
      body: {
        id: boat.id,
        name: boat.title,
        type: boat.type,
        price: boat.price,
        location: boat.location,
        prePaymentRate: boat.prePaymentRate,
        personCapacity: boat.personCapacity,
        isCrewed: boat.isCrewed,
        avaibles: [],
      },
    });
  }

  async createBoats(boats: any[]) {
    const operations = boats.flatMap((boat) => {
      const doc = {
        id: boat.id,
        name: boat.title,
        type: boat.type.id,
        price: boat.price,
        location: boat.location.id,
        prePaymentRate: boat.prePaymentRate,
        personCapacity: boat.personCapacity,
        isCrewed: boat.isCrewed,
        avaibles: [],
      };
      return [
        {
          index: {
            _index: this.indexName,
            _id: boat.id,
          },
        },
        doc,
      ];
    });
    return this.elasticsearchService.bulk({
      refresh: true,
      operations,
    });
  }

  async createMapping() {
    return this.elasticsearchService.indices.create({
      index: this.indexName,
      mappings: {
        properties: {
          id: { type: 'integer' },
          name: { type: 'text' },
          type: { type: 'integer' },
          price: { type: 'float' },
          location: { type: 'integer' },
          prePaymentRate: { type: 'float' },
          personCapacity: { type: 'integer' },
          isCrewed: { type: 'boolean' },
          avaibles: {
            type: 'nested',
            properties: {
              user: { type: 'integer' },
              startDate: { type: 'date' },
              endDate: { type: 'date' },
            },
          },
        },
      },
    });
  }

  async boatAddAvaible(id: any, avaible: BoatAvaible) {
    return this.elasticsearchService.update<BoatBody>({
      index: this.indexName,
      id,
      script: {
        source: `
          if (ctx._source.avaibles == null) {
            ctx._source.avaibles = [];
          }
          ctx._source.avaibles.add(params.avaible);
        `,
        params: {
          avaible,
        },
      },
    });
  }

  async getAvailable(params: BoatSearchRequestDto) {
    const sDate = dayjs(params.startDate).toDate().toISOString();
    const eDate = dayjs(params.endDate).toDate().toISOString();

    const must: any = [];

    must.push({
      match: {
        location: params.location,
      },
    });

    if (params.priceStart && params.priceEnd) {
      must.push({
        range: {
          price: {
            gte: params.priceStart,
            lte: params.priceEnd,
          },
        },
      });
    }

    if (params.personCapacityStart && params.personCapacityEnd) {
      must.push({
        range: {
          personCapacity: {
            gte: params.personCapacityStart,
            lte: params.personCapacityEnd,
          },
        },
      });
    }

    if (params.isCrewed) {
      must.push({
        match: {
          isCrewed: params.isCrewed,
        },
      });
    }

    const query: any = {
      index: this.indexName,
      body: {
        query: {
          bool: {
            must,
            must_not: {
              nested: {
                path: 'avaibles',
                query: {
                  bool: {
                    should: [
                      {
                        range: {
                          'avaibles.startDate': {
                            gte: sDate,
                            lte: eDate,
                          },
                        },
                      },
                      {
                        range: {
                          'avaibles.endDate': {
                            gte: sDate,
                            lte: eDate,
                          },
                        },
                      },
                      {
                        bool: {
                          must: [
                            {
                              range: {
                                'avaibles.startDate': {
                                  lt: sDate,
                                },
                              },
                            },
                            {
                              range: {
                                'avaibles.endDate': {
                                  gt: eDate,
                                },
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              },
            },
          },
        },
      },
    };

    if (params.type) {
      query.body.query.bool.filter = {
        terms: {
          type: Array.isArray(params.type) ? params.type : [params.type],
        },
      };
    }

    return this.elasticsearchService.search(query);
  }
}
