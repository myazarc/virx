import { IGeneric } from 'src/common/generic/IGeneric';

export interface IUser extends IGeneric {
  name: string;
  email: string;
  password: string;
  isActive?: boolean;
  deletedAt?: Date;
  createdAt?: Date;
  emailConfirmed?: boolean;
}

export type UserEssentialProperties = Required<{
  readonly id: string;
  readonly username: string;
  readonly password: string;
  readonly email: string;
}>;

export type UserPartialProperties = Partial<{
  readonly isActive?: boolean;
  readonly deletedAt?: Date;
  readonly createdAt?: Date;
  readonly emailConfirmed?: boolean;
}>;

export type UserProperties = UserPartialProperties &
  Required<UserEssentialProperties>;
