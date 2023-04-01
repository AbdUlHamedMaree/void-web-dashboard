import { dataStorage } from '$modules/data-storage';

export const storage = {
  language: dataStorage<string>('void-language'),
};
