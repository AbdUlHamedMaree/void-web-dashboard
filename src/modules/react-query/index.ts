/* eslint-disable @typescript-eslint/no-explicit-any */
import { mergeFunctions } from '$modules/utils';
import type { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axios from 'axios';
import { useCallback, useMemo } from 'react';
import type {
  UseQueryOptions,
  UseMutationOptions,
  UseMutateAsyncFunction,
} from 'react-query';
import { useQuery as useBaseQuery, useMutation as useBaseMutation } from 'react-query';

export type AxiosRequestConfigWithTypes<
  TData = any,
  TQuery extends string = string,
  TParams = any
> = Omit<AxiosRequestConfig, 'data' | 'params' | 'query'> & {
  data?: TData;
  query?: Record<TQuery, string | number | boolean | undefined | null>;
  params?: TParams;
};

const defaultOptions: Required<CreateReactQueryOptions> = {
  axiosInstance: axios.create(),
  toast: false,
  log: false,
};

export type CreateReactQueryOptions = {
  axiosInstance?: AxiosInstance;
  toast?: false | ((err: AxiosError) => unknown | Promise<unknown>);
  log?: false | ((err: AxiosError) => unknown | Promise<unknown>);
};

const createQueryHelper =
  ({ axiosInstance, toast, log }: Required<CreateReactQueryOptions>) =>
  <
    TQueryData = any,
    TQueryBody = any,
    TQueryQuery extends string = string,
    TQueryParams = any
  >(
    baseConfig?: AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>,
    baseQueryOptions?: UseQueryOptions<
      AxiosResponse<TQueryData>,
      unknown,
      AxiosResponse<TQueryData>,
      [AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>]
    >
  ) => {
    const useFn = (
      hookConfig?: AxiosRequestConfigWithTypes<
        TQueryBody,
        TQueryQuery,
        TQueryParams
      > | null,
      hookQueryOptions?: UseQueryOptions<
        AxiosResponse<TQueryData>,
        unknown,
        AxiosResponse<TQueryData>,
        [AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>]
      > | null
    ) => {
      const config = useMemo(() => ({ ...baseConfig, ...hookConfig }), [hookConfig]);
      const options = useMemo(
        () => ({
          ...baseQueryOptions,
          ...hookQueryOptions,
          onSuccess: mergeFunctions(
            baseQueryOptions?.onSuccess,
            hookQueryOptions?.onSuccess
          ),
          onSettled: mergeFunctions(
            baseQueryOptions?.onSettled,
            hookQueryOptions?.onSettled
          ),
          onError: mergeFunctions(baseQueryOptions?.onError, hookQueryOptions?.onError),
        }),
        [hookQueryOptions]
      );
      return useBaseQuery<
        AxiosResponse<TQueryData>,
        unknown,
        AxiosResponse<TQueryData>,
        [AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>]
      >(
        [config],
        async ({ signal }) => {
          try {
            return await axiosInstance.request<TQueryData>({
              ...config,
              signal,
            });
          } catch (err) {
            if (!axios.isAxiosError(err)) throw err;
            log && log(err);
            toast && toast(err);
            throw err;
          }
        },
        options
      );
    };
    useFn.request = (
      fnConfig?: AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>
    ) =>
      axiosInstance
        .request<TQueryData>({
          ...baseConfig,
          ...fnConfig,
        })
        .then(data => {
          baseQueryOptions?.onSuccess?.(data);
          return data as TQueryData;
        })
        .catch(err => {
          baseQueryOptions?.onError?.(err);
          return Promise.reject(err);
        });
    useFn.config = baseConfig;
    return useFn;
  };

const createMutationHelper =
  ({ axiosInstance, toast, log }: Required<CreateReactQueryOptions>) =>
  <
    TQueryData = any,
    TQueryBody = any,
    TQueryQuery extends string = string,
    TQueryParams = any
  >(
    baseConfig?: AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>,
    baseQueryOptions?: UseMutationOptions<
      AxiosResponse<TQueryData>,
      unknown,
      AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>,
      unknown
    >
  ) => {
    const useFn = (
      hookConfig?: AxiosRequestConfigWithTypes<
        TQueryBody,
        TQueryQuery,
        TQueryParams
      > | null,
      hookQueryOptions?: UseMutationOptions<
        AxiosResponse<TQueryData>,
        unknown,
        AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>,
        unknown
      > | null
    ) => {
      const config = useMemo(() => ({ ...baseConfig, ...hookConfig }), [hookConfig]);
      const options = useMemo(
        () => ({
          ...baseQueryOptions,
          ...hookQueryOptions,
          onSuccess: mergeFunctions(
            baseQueryOptions?.onSuccess,
            hookQueryOptions?.onSuccess
          ),
          onSettled: mergeFunctions(
            baseQueryOptions?.onSettled,
            hookQueryOptions?.onSettled
          ),
          onMutate: mergeFunctions(
            baseQueryOptions?.onMutate,
            hookQueryOptions?.onMutate
          ),
          onError: mergeFunctions(baseQueryOptions?.onError, hookQueryOptions?.onError),
        }),
        [hookQueryOptions]
      );
      const toReturn = useBaseMutation<
        AxiosResponse<TQueryData>,
        unknown,
        AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>,
        unknown
      >(
        [config],
        async fnConfig => {
          try {
            return await axiosInstance.request<TQueryData>({
              ...config,
              ...fnConfig,
            });
          } catch (err) {
            if (!axios.isAxiosError(err)) throw err;
            log && log(err);
            toast && toast(err);
            throw err;
          }
        },
        options
      );

      const safeMutateAsync = useCallback<
        UseMutateAsyncFunction<
          AxiosResponse<TQueryData> | undefined,
          unknown,
          AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>,
          unknown
        >
      >(
        async (...args) => {
          try {
            return await toReturn.mutateAsync(...args);
          } catch (err) {
            console.error(err);
            return undefined;
          }
        },
        [toReturn]
      );

      return useMemo(
        () => ({ ...toReturn, safeMutateAsync }),
        [toReturn, safeMutateAsync]
      );
    };
    useFn.request = (
      fnConfig?: AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>
    ) => {
      const ctx = baseQueryOptions?.onMutate?.({
        ...baseConfig,
        ...fnConfig,
      });
      return axiosInstance
        .request<TQueryData>({
          ...baseConfig,
          ...fnConfig,
        })
        .then(data => {
          baseQueryOptions?.onSuccess?.(
            data,
            {
              ...baseConfig,
              ...fnConfig,
            },
            ctx
          );
          baseQueryOptions?.onSettled?.(
            data,
            undefined,
            {
              ...baseConfig,
              ...fnConfig,
            },
            ctx
          );
          return data;
        })
        .catch(err => {
          baseQueryOptions?.onError?.(
            err,
            {
              ...baseConfig,
              ...fnConfig,
            },
            ctx
          );
          baseQueryOptions?.onSettled?.(
            undefined,
            err,
            {
              ...baseConfig,
              ...fnConfig,
            },
            ctx
          );
          return Promise.reject(err);
        });
    };
    useFn.config = baseConfig;
    return useFn;
  };

const createSharedHelper =
  (options: Required<CreateReactQueryOptions>) =>
  <
    TQueryData = any,
    TQueryBody = any,
    TQueryQuery extends string = string,
    TQueryParams = any
  >(
    baseConfig?: AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>,
    {
      mutationOptions,
      queryOptions,
    }: {
      mutationOptions?: UseMutationOptions<
        AxiosResponse<TQueryData>,
        unknown,
        AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>,
        unknown
      >;
      queryOptions?: UseQueryOptions<
        AxiosResponse<TQueryData>,
        unknown,
        AxiosResponse<TQueryData>,
        [AxiosRequestConfigWithTypes<TQueryBody, TQueryQuery, TQueryParams>]
      >;
    } = {}
  ) => {
    return {
      mutation: createMutationHelper(options)(baseConfig, mutationOptions),
      query: createQueryHelper(options)(baseConfig, queryOptions),
    };
  };

export const createReactQueryFns = (options?: CreateReactQueryOptions) => {
  const resOptions = { ...defaultOptions, ...options };
  return {
    createMutation: createMutationHelper(resOptions),
    createQuery: createQueryHelper(resOptions),
    createShared: createSharedHelper(resOptions),
  };
};
