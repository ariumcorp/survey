export function addIndexToItems<T>(value: T[]): T[] {
  return value.map((item, i) => ({ ...item, index: i }));
}
