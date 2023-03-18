export const shallowEqual = <T extends object>(a: T, b: T, filtered?: (keyof T)[]) => {
  let aKeys = Object.keys(a) as (keyof T)[],
    bKeys = Object.keys(b) as (keyof T)[];

  if (filtered) {
    aKeys = aKeys.filter(key => !filtered.includes(key));
    bKeys = bKeys.filter(key => !filtered.includes(key));
  }

  if (aKeys.length !== bKeys.length) return false;

  return !aKeys.some(key => a[key] !== b[key]);
};
