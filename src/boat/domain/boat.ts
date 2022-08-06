import { IGeneric } from 'src/common/generic/IGeneric';

export interface IBoat extends IGeneric {
  user: number;
  title: string;
  description?: string;
  price: number;
  location: number;
  isActive?: boolean;
  prePaymentRate: number;
  personCapacity: number;
  isCrewed: boolean;
  type: any;
}
