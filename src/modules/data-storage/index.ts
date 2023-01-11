export const dataStorage = <T>(key: string) => ({
  set: (data: T) =>
    void (
      typeof window !== 'undefined' &&
      window.localStorage.setItem(key, JSON.stringify(data))
    ),
  get: () => {
    if (typeof window === 'undefined') return undefined;
    const json = window.localStorage.getItem(key);
    return json ? (JSON.parse(json) as T) : undefined;
  },
  remove: () =>
    void (typeof window !== 'undefined' && window.localStorage.removeItem(key)),
});
