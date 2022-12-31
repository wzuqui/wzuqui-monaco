export function transformDeepProperties(obj: any): any {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const keys = key.split('.');
    let current = acc;
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {};
      }
      current = current[keys[i]];
    }
    if (typeof value === 'object') {
      current[keys[keys.length - 1]] = transformDeepProperties(value);
    } else {
      current[keys[keys.length - 1]] = value;
    }
    return acc;
  }, {});
}
