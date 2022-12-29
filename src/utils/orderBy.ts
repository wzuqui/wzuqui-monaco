export function orderBy<T, K extends any>(list: T[], getKey: (item: T) => K) {
  return list.sort((a, b) => {
    const keyA = getKey(a);
    const keyB = getKey(b);
    if (keyA < keyB) {
      return -1;
    }
    if (keyA > keyB) {
      return 1;
    }
    return 0;
  });
}
