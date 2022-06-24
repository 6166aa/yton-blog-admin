export type CommonResponse<T> = {
  statusCode: number;
  data?: T;
  message: string;
  error?: string;
};
