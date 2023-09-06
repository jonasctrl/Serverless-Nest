import { ObjectLiteral, SelectQueryBuilder } from 'typeorm';

export const getRawOne = async <T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  columns: Array<keyof T>,
): Promise<T | undefined> => {
  return queryBuilder.select(columns as any).getRawOne();
};

export const filterByProperties = <T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  filters: Partial<T>,
): SelectQueryBuilder<T> => {
  if (!filters || !Object.keys(filters).length) {
    return queryBuilder;
  }

  const alias = queryBuilder.alias;

  for (const [key, value] of Object.entries(filters)) {
    queryBuilder.andWhere(`${alias}.${key} = :${key}`, { [key]: value });
  }

  return queryBuilder;
};

export const selectFromMap = <T extends ObjectLiteral>(
  queryBuilder: SelectQueryBuilder<T>,
  map: {
    selector: string;
    alias: string;
  }[],
): SelectQueryBuilder<T> => {
  for (const { selector, alias } of map) {
    queryBuilder.addSelect(selector, alias);
  }

  return queryBuilder;
};
