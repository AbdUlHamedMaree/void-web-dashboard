/* eslint-disable @typescript-eslint/ban-ts-comment */
import { createStore } from '$modules/zustand';
import type { CreateStoreOptions } from '$modules/zustand';
import { capitalize } from '@mui/material';

export const createEntityStore =
  <TName extends string, TPlural extends string = 's'>(
    entity: TName,
    plural: TPlural = 's' as TPlural
  ) =>
  <TEntity extends { id: unknown }>(options?: CreateStoreOptions) => {
    type EntityKey = `${TName}${TPlural}`;
    type CapitalizedName = Capitalize<TName>;

    type State = Record<EntityKey, TEntity[]>;

    type Actions = Record<
      `set${CapitalizedName}${TPlural}`,
      (entities: TEntity[]) => void
    > &
      Record<`get${CapitalizedName}`, (id?: unknown) => TEntity | undefined> &
      Record<`add${CapitalizedName}`, (entities: TEntity) => void> &
      Record<
        `edit${CapitalizedName}`,
        (id?: unknown, entities?: Partial<TEntity>) => void
      > &
      Record<`delete${CapitalizedName}`, (id?: unknown) => void>;

    const entityKey = `${entity}${plural}` as EntityKey;
    const capitalizedName = capitalize(entity) as CapitalizedName;

    return createStore(options)<State, Actions>(
      {
        [entityKey]: [],
      } as unknown as State,
      (set, get) =>
        ({
          [`set${capitalizedName}${plural}`]: (entities: TEntity[]) =>
            set(s => {
              // @ts-ignore
              s[entityKey] = entities;
            }),
          [`get${capitalizedName}`]: (id?: unknown) =>
            (get()[entityKey] as TEntity[]).find(entity => entity.id === id),
          [`add${capitalizedName}`]: (entity: TEntity) =>
            set(s => {
              // @ts-ignore
              s[entityKey] = [...s[entityKey], entity];
            }),
          [`edit${capitalizedName}`]: (id?: unknown, entity?: Partial<TEntity>) =>
            set(s => {
              // @ts-ignore
              const index = (s[entityKey] as TEntity[]).findIndex(
                entity => entity.id === id
              );
              if (index === -1) return;

              // @ts-ignore
              s[entityKey][index] = {
                // @ts-ignore
                ...s[entityKey][index],
                ...entity,
              };
            }),
          [`delete${capitalizedName}`]: (id?: unknown) =>
            set(s => {
              // @ts-ignore
              s[entityKey] = (s[entityKey] as TEntity[]).filter(
                entity => entity.id !== id
              );
            }),
        } as Actions)
    );
  };
