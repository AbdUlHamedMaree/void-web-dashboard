import { stringifyUrlObject } from '$modules/stringify-url-object';
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
    geofences: {
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
    'vehicles-events': {
      'green-driving': {
        '[id]': {
          view: PathnameUrlObjectFunction;
        };
      };
      list: PathnameUrlObjectFunction;
    };
  };
};

const api = <TMap = AnyRoutesMap>(path: (string | symbol)[] = []) =>
  new Proxy(
    (args => {
      const pathname = '/' + path.join('/');

      const pureUrlObject = {
        pathname,
        ...args,
      };

      const link = stringifyUrlObject.relative(pureUrlObject);

      const urlObject = {
        link,
        ...pureUrlObject,
      };

      return urlObject;
    }) as PathnameUrlObjectFunction,
    {
      get: (_, key): any => (key === 'index' ? api(path) : api([...path, key])),
    }
  ) as TMap;

export const routes = api<AppRoutesMap>();
