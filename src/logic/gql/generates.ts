import type { GraphQLClient } from 'graphql-request';
import type { RequestInit } from 'graphql-request/dist/types.dom';
import type { UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { useQuery, useMutation } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};

function fetcher<TData, TVariables extends { [key: string]: any }>(
  client: GraphQLClient,
  query: string,
  variables?: TVariables,
  requestHeaders?: RequestInit['headers']
) {
  return async (): Promise<TData> =>
    client.request({
      document: query,
      variables,
      requestHeaders,
    });
}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Device = {
  __typename?: 'Device';
  IMEI: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type LoginPayload = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  OtpLogin: Scalars['Boolean'];
  deleteDevice: Scalars['Boolean'];
  device: Device;
  getNewTokens: SignResponse;
  login: SignResponse;
  updateDevice: Device;
  verifyOTP: SignResponse;
};

export type MutationOtpLoginArgs = {
  payload: OtpLoginPayload;
};

export type MutationLoginArgs = {
  payload: LoginPayload;
};

export type MutationVerifyOtpArgs = {
  payload: VerificationPayload;
};

export type OtpLoginPayload = {
  phoneNumber: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  deviceById: Device;
  devices: Array<Device>;
  hello: Scalars['String'];
  hello2: Scalars['String'];
};

export type SignResponse = {
  __typename?: 'SignResponse';
  accessToken: Scalars['String'];
  refreshToken: Scalars['String'];
  user: User;
};

/** User */
export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type VerificationPayload = {
  otp: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type DevicesQueryVariables = Exact<{ [key: string]: never }>;

export type DevicesQuery = {
  __typename?: 'Query';
  devices: Array<{ __typename?: 'Device'; name: string }>;
};

export type LoginMutationVariables = Exact<{
  payload: LoginPayload;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'SignResponse';
    accessToken: string;
    refreshToken: string;
    user: {
      __typename?: 'User';
      email: string;
      firstName: string;
      lastName: string;
      phoneNumber: string;
    };
  };
};

export const DevicesDocument = `
    query Devices {
  devices {
    name
  }
}
    `;
export const useDevicesQuery = <TData = DevicesQuery, TError = unknown>(
  client: GraphQLClient,
  variables?: DevicesQueryVariables,
  options?: UseQueryOptions<DevicesQuery, TError, TData>,
  headers?: RequestInit['headers']
) =>
  useQuery<DevicesQuery, TError, TData>(
    variables === undefined ? ['Devices'] : ['Devices', variables],
    fetcher<DevicesQuery, DevicesQueryVariables>(
      client,
      DevicesDocument,
      variables,
      headers
    ),
    options
  );
export const LoginDocument = `
    mutation Login($payload: LoginPayload!) {
  login(payload: $payload) {
    accessToken
    refreshToken
    user {
      email
      firstName
      lastName
      phoneNumber
    }
  }
}
    `;
export const useLoginMutation = <TError = unknown, TContext = unknown>(
  client: GraphQLClient,
  options?: UseMutationOptions<LoginMutation, TError, LoginMutationVariables, TContext>,
  headers?: RequestInit['headers']
) =>
  useMutation<LoginMutation, TError, LoginMutationVariables, TContext>(
    ['Login'],
    (variables?: LoginMutationVariables) =>
      fetcher<LoginMutation, LoginMutationVariables>(
        client,
        LoginDocument,
        variables,
        headers
      )(),
    options
  );
