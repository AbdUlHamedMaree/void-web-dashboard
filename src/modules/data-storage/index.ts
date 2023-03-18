export const dataStorage = <T>(key: string) => ({
  set: (data: T) =>
    void (
      typeof localStorage !== 'undefined' &&
      localStorage.setItem(key, JSON.stringify(data))
    ),
  get: (defaultValue?: T | undefined) => {
    if (typeof localStorage === 'undefined') return undefined;
    const json = localStorage.getItem(key);
    return json ? (JSON.parse(json) as T) : defaultValue;
  },
  remove: () =>
    void (typeof localStorage !== 'undefined' && localStorage.removeItem(key)),
});
