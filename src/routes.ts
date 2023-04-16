import { isNil } from '$modules/checks';
import type { LinkProps } from 'next/link';
import type { UrlObject } from 'url';

export type NextUrl = LinkProps['href'];

export type ResolvedUrlObject = {
  [K in keyof UrlObject]: Exclude<UrlObject[K], null>;
};

export type PathnameUrlObject = Omit<ResolvedUrlObject, 'pathname'> &
  Required<Pick<ResolvedUrlObject, 'pathname'>>;

export type PathnameUrlObjectFunction = (
  rest?: Omit<ResolvedUrlObject, 'pathname'>
) => PathnameUrlObject & { link: string };

export interface AnyRoutesMap {
  [k: string]: PathnameUrlObjectFunction & AnyRoutesMap;
}

export type AppRoutesMap = {
  auth: {
    'forgot-password': PathnameUrlObjectFunction;
    login: PathnameUrlObjectFunction;
    'set-password': PathnameUrlObjectFunction;
  };
  dashboard: {
    index: PathnameUrlObjectFunction;
    devices: {
      '[id]': {
        edit: PathnameUrlObjectFunction;
        view: PathnameUrlObjectFunction;
      };
      list: PathnameUrlObjectFunction;
      new: PathnameUrlObjectFunction;
    };
    drivers: {
      '[id]': {
        edit: PathnameUrlObjectFunction;
        view: PathnameUrlObjectFunction;
      };
      list: PathnameUrlObjectFunction;
      new: PathnameUrlObjectFunction;
    };
    live: {
      index: PathnameUrlObjectFunction;
    };
    'trips-history': {
      '[id]': {
        view: PathnameUrlObjectFunction;
      };
      list: PathnameUrlObjectFunction;
    };
    users: {
      '[id]': {
        edit: PathnameUrlObjectFunction;
        view: PathnameUrlObjectFunction;
      };
      list: PathnameUrlObjectFunction;
      new: PathnameUrlObjectFunction;
    };
    vehicles: {
      '[id]': {
        edit: PathnameUrlObjectFunction;
        view: PathnameUrlObjectFunction;
      };
      list: PathnameUrlObjectFunction;
      new: PathnameUrlObjectFunction;
    };
  };
};

const applyQuery = (pathname: string, query?: PathnameUrlObject['query']) => {
  if (!query || typeof query !== 'object') return pathname;

  return Object.entries(query).reduce(
    (acc, [key, value]) =>
      !isNil(value) ? pathname.replaceAll(`[${key}]`, value.toString()) : pathname,
    pathname
  );
};

const applySearch = (pathname: string, search?: string) => {
  if (!search) return pathname;
  if (search.startsWith('?')) return pathname + search;
  return pathname + '?' + search;
};

const getLink = ({
  pathname,
  query,
  search,
}: Pick<PathnameUrlObject, 'pathname' | 'query' | 'search'>) =>
  applySearch(applyQuery(pathname, query), search);

const api = <TMap = AnyRoutesMap>(path: (string | symbol)[] = []) =>
  new Proxy(
    (args => {
      const pathname = '/' + path.join('/');

      const link = getLink({
        pathname,
        query: args?.query,
        search: args?.search,
      });

      const urlObject = {
        pathname,
        link,
        ...args,
      };

      return urlObject;
    }) as PathnameUrlObjectFunction,
    {
      get: (_, key): any => (key === 'index' ? api(path) : api([...path, key])),
    }
  ) as TMap;

export const routes = api<AppRoutesMap>();
