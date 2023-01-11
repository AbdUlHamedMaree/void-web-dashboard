import { AxiosError, AxiosInstance } from 'axios';

export type CreateReactQueryOptions = {
  axiosInstance?: AxiosInstance;
  toast?: false | ((err: AxiosError) => unknown | Promise<unknown>);
  log?: false | ((err: unknown) => unknown | Promise<unknown>);
};
