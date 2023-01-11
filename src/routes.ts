import { UrlObject } from 'url';

export type ResolvedUrlObject = {
  [K in keyof UrlObject]: Exclude<UrlObject[K], null>;
};

export type PathnameUrlObject = Omit<ResolvedUrlObject, 'pathname'> &
  Required<Pick<ResolvedUrlObject, 'pathname'>>;

export type PathnameUrlObjectFunction = (
  rest?: Omit<ResolvedUrlObject, 'pathname'>
) => PathnameUrlObject;

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
    users: {
      list: PathnameUrlObjectFunction;
      new: PathnameUrlObjectFunction;
    };
  };
};

const api = <TMap = AnyRoutesMap>(path: (string | symbol)[] = []) =>
  new Proxy(
    (args => ({
      pathname: '/' + path.join('/'),
      ...args,
    })) as PathnameUrlObjectFunction,
    {
      get: (_, key): any => (key === 'index' ? api(path) : api([...path, key])),
    }
  ) as TMap;

export const routes = api<AppRoutesMap>();
