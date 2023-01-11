import { isString } from '$modules/checks';
import { addMethod, number, string } from 'yup';

declare module 'yup' {
  export interface StringSchema {
    /**
     * transform `''` value into `null`.
     *
     * **Warning**: be sure to use `nullable` in the schema.
     */
    emptyToNull(): StringSchema;
  }
  export interface NumberSchema {
    /**
     * transform `''` value into `null`.
     *
     * **Warning**: be sure to use `nullable` in the schema.
     */
    emptyToNull(): StringSchema;
  }
}

addMethod(string, 'emptyToNull', function emptyToNull() {
  return this.transform((v: string, ov: string) =>
    isString(ov) && ov.trim() === '' ? null : v
  );
});
addMethod(number, 'emptyToNull', function emptyToNull() {
  return this.transform((v: string, ov: string) =>
    isString(ov) && ov.trim() === '' ? null : v
  );
});
