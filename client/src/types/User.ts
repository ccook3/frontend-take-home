import { Role } from './Role';

export type User = {
  createdAt: Date;
  first: string;
  last: string;
  id: string;
  role: Role;
  photo: string;
  updatedAt: Date;
  roleId: string;
};

export type PaginatedUserResponse = {
  data: User[];
  next: number | null;
  prev: number | null;
  pages: number;
};
