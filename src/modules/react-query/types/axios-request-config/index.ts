import { AxiosRequestConfig } from 'axios';

export type AxiosRequestConfigWithTypes<
  TData = any,
  TQuery extends string = string,
  TParams = any
> = Omit<AxiosRequestConfig, 'data' | 'params' | 'query'> & {
  data?: TData;
  query?: Record<TQuery, string | number | boolean | undefined | null>;
  params?: TParams;
};
