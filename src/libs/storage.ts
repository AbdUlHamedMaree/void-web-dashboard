import { dataStorage } from '$modules/data-storage';

export const storage = {
  user: dataStorage<any | null>('pizza-user'),
  language: dataStorage<string>('pizza-language'),
};
