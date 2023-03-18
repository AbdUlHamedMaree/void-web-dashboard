import { client } from '$logic/libs/graphql-request';
import { type TypedDocumentNode } from '@graphql-typed-document-node/core';
import type { UseMutationOptions, UseQueryOptions } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { OperationDefinitionNode } from 'graphql';
import type { RequestInit } from 'graphql-request/dist/types.dom';

export const useGraphQL = <TResult, TError, TVariables>(
  document: TypedDocumentNode<TResult, TVariables>,
  ...[variables, options, headers]: TVariables extends Record<string, never>
    ? [
        TVariables?,
        UseQueryOptions<
          TResult,
          TError,
          TResult,
          readonly [string | undefined, TVariables | TVariables | undefined]
        >?,
        RequestInit['headers']?
      ]
    : [
        TVariables,
        UseQueryOptions<
          TResult,
          TError,
          TResult,
          readonly [string | undefined, TVariables | TVariables | undefined]
        >?,
        RequestInit['headers']?
      ]
) =>
  useQuery<
    TResult,
    TError,
    TResult,
    readonly [string | undefined, TVariables | TVariables | undefined]
  >(
    [
      (document.definitions[0] as OperationDefinitionNode).name?.value,
      variables,
    ] as const,
    async ({ queryKey }) =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      client.request<TResult, TVariables>(document, queryKey[1], headers),
    options
  );

export const useGraphQLMutation = <TResult, TError, TVariables, TContext>(
  document: TypedDocumentNode<TResult, TVariables>,
  options?: UseMutationOptions<
    TResult,
    TError,
    TVariables extends Record<string, never> ? void : TVariables,
    TContext
  >,
  headers?: RequestInit['headers']
) =>
  useMutation<
    TResult,
    TError,
    TVariables extends Record<string, never> ? void : TVariables,
    TContext
  >(
    [(document.definitions[0] as OperationDefinitionNode).name?.value],
    variables =>
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      client.request<TResult, TVariables>(document, variables, headers),
    options
  );
