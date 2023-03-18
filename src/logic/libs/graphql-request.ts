import { GraphQLClient } from 'graphql-request';
// ... or create a GraphQL client instance to send requests
export const client = new GraphQLClient(process.env.NEXT_PUBLIC_API_URL ?? '');
