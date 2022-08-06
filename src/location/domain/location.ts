import { IGeneric } from 'src/common/generic/IGeneric';

export interface ILocation extends IGeneric {
  name: string;
  isActive?: boolean;
  deletedAt?: Date;
}
