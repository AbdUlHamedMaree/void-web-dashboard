export const wait = (ms = 800) => new Promise<void>(resolve => setTimeout(resolve, ms));
