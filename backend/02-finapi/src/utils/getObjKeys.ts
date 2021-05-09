export function getObjKeys(obj = {}, keys = [] as string[]) {
  const finalObj = {};

  keys.forEach((key) => {
    const value = (obj as any)[key];

    if (typeof key === 'undefined') return;

    (finalObj as any)[key] = value;
  });

  return finalObj;
}
