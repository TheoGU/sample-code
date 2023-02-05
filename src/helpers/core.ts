export const isNone = (value: unknown): value is undefined | null => {
  return value === undefined || value === null;
};
