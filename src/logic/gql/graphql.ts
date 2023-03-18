/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type DevicesQueryVariables = Exact<{ [key: string]: never; }>;


export type DevicesQuery = { __typename?: 'Query', devices: Array<{ __typename?: 'Device', name: string }> };

export type LoginMutationVariables = Exact<{
  payload: LoginPayload;
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'SignResponse', accessToken: string, refreshToken: string, user: { __typename?: 'User', email: string, firstName: string, lastName: string, phoneNumber: string } } };


export const DevicesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Devices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"devices"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<DevicesQuery, DevicesQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"payload"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginPayload"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"payload"},"value":{"kind":"Variable","name":{"kind":"Name","value":"payload"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}},{"kind":"Field","name":{"kind":"Name","value":"refreshToken"}},{"kind":"Field","name":{"kind":"Name","value":"user"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"firstName"}},{"kind":"Field","name":{"kind":"Name","value":"lastName"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;