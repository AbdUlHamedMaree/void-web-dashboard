export const isUndefined = (val: unknown): val is undefined => typeof val === 'undefined';
export const isNull = (val: unknown): val is null => val === null;
export const isNil = (val: unknown): val is undefined | null => val == null;
export const isDefined = <T>(arg: T): arg is Exclude<T, undefined | null> => !isNil(arg);

export const hasLength = <T extends { length: number }>(val: T): boolean =>
  val.length > 0;

export const isString = (val: unknown): val is string => typeof val === 'string';
export const isStringFull = (val: unknown): val is string =>
  isString(val) && hasLength(val);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const isArray = <T>(val: T): val is T extends Array<infer V> ? V[] : any[] =>
  Array.isArray(val);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const isArrayFull = <T>(val: T): val is T extends Array<infer V> ? V[] : any[] =>
  Array.isArray(val) && hasLength(val);

export const isArrayStrings = (val: unknown): val is string[] =>
  isArrayFull(val) && val.every(v => isStringFull(v));
export const isObject = (val: unknown): val is object =>
  typeof val === 'object' && !isNull(val);
export const isObjectFull = (val: unknown): val is object =>
  isObject(val) && hasLength(Object.keys(val));
export const isNumber = (val: unknown): val is number =>
  typeof val === 'number' && !Number.isNaN(val) && Number.isFinite(val);
export const isBoolean = (val: unknown): val is boolean => typeof val === 'boolean';
export const isNumeric = (val: string): boolean => /^[+-]?([0-9]*[.])?[0-9]+$/.test(val);
export const isDateString = (val: string): boolean =>
  isStringFull(val) &&
  /^\d{4}-[01]\d-[0-3]\d(?:T[0-2]\d:[0-5]\d:[0-5]\d(?:\.\d+)?(?:Z|[-+][0-2]\d(?::?[0-5]\d)?)?)?$/g.test(
    val
  );
export const isDate = (val: unknown): val is Date => val instanceof Date;
export const isValue = (val: unknown): val is string | number | boolean | Date =>
  isStringFull(val) || isNumber(val) || isBoolean(val) || isDate(val);
export const hasValue = (val: unknown): boolean =>
  isArrayFull(val) ? val.every(o => isValue(o)) : isValue(val);

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = <T>(val: T): val is T extends Function ? T : Function =>
  typeof val === 'function';

export const isMobile = () =>
  /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent
  );
