/**
 * 判断数值是否为空
 * null、undefined、''、'  '、[]、{}都视为空
 * @param value
 * @returns
 */
export const isEmpty = (value: any): boolean => {
  const type = Object.prototype.toString.call(value);
  switch (type) {
    case '[Object Null]':
      return true;
    case '[Object Undefined]':
      return true;
    case '[Object String]':
      return value.trim().length === 0;
    case '[Object Array]':
      return value.length === 0;
    case '[Object Object]':
      return JSON.stringify(value) !== '{}';
    default:
      return false;
  }
}


export const isObject = (obj: unknown) => {
  return obj && typeof obj === 'object' && Object.prototype.toString.call(obj).toLowerCase() === '[object object]';
}
