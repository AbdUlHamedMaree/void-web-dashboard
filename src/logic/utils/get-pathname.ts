import { isString } from '$modules/checks';
import type { PathnameUrlObject } from '$routes';

export const getPathname = (path: string | PathnameUrlObject) =>
  isString(path) ? path : path.pathname;

export const getNilPathname = (path?: string | PathnameUrlObject) =>
  isString(path) ? path : path?.pathname;
