import type { ParsedUrlQueryInput } from 'querystring';
import type { UrlObject } from 'url';

export const stringifyUrlObject = {
  relative: (obj: UrlObject) => {
    if (obj.href) {
      if (obj.host) return obj.href.slice(obj.href.indexOf(obj.host) + obj.host.length);
      const match = obj.href.matchAll(/\//g);
      match.next();
      match.next();
      const { value } = match.next();
      return value ? obj.href.slice(value.index) : '/';
    }

    return applySearch(
      applyHash(applyQuery(obj.pathname ?? '/', obj.query), obj.hash),
      obj.search
    );
  },

  absolute: (obj: UrlObject) => {
    if (obj.href) return obj.href;
  },
};

export const applyQuery = (url: string, query?: string | ParsedUrlQueryInput | null) =>
  typeof query === 'object' && query != null
    ? Object.entries(query).reduce(
        (acc, [k, v]) =>
          v != null ? acc.replaceAll(`[${k}]`, encodeURIComponent(v.toString())) : acc,
        url
      )
    : url;

const applyHash = (url: string, hash?: string | null) => (hash ? url + hash : url);

const applySearch = (url: string, search?: string | null) =>
  search ? url + search : url;
