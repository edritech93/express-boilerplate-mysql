export type ErrorType = {
  status: number;
  data: object;
  type: 'jwt' | 'default';
} & Error;
