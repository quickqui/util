export function notNil<TValue>(
  value: TValue | null | undefined
): value is TValue {
  return value !== null && value !== undefined;
}
export function replaceInObject(
  obj: any,
  find: RegExp,
  replace: (matchResult: RegExpExecArray ) => any
) {
  const ret: any = {};
  if (Array.isArray(obj)) {
    return obj.map((a) => {
      return replaceInObject(a, find, replace);
    });
  }
  Object.keys(obj).forEach((key) => {
    if (obj[key] && typeof obj[key] === "object") {
      ret[key] = replaceInObject(obj[key], find, replace);
    } else if (
      obj[key] &&
      typeof obj[key] === "string" &&
      find.test(obj[key])
    ) {
      //TODO 只处理了匹配一次的情况。
      ret[key] = replace(find.exec(obj[key])!);
    } else {
      ret[key] = obj[key];
    }
  });
  return ret;
}
export function filterObject(obj: any) {
  const ret: any = {};
  Object.keys(obj)
    .filter((key) => obj[key] !== undefined)
    .forEach((key) => (ret[key] = obj[key]));
  return ret;
}
