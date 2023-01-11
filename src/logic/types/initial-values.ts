export type InitialValues<T> = {
  [K in keyof T]: '' | T[K];
};
