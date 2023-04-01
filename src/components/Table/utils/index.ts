import {get, isUndefined, sumBy} from "lodash-es";
import {ColumnsProps} from "../Types";

export function getValueByKey<T, KeyResult>(
  record: T,
  key: string | ((record: T) => KeyResult),
): KeyResult | undefined {
  if (typeof key === 'string') {
    return get(record, key);
  } else if (typeof key === 'function') {
    return key(record);
  }
  return undefined;
}

export function getColumnsTotalWidth<T>(columns: ColumnsProps<T>[]) {
  return sumBy(columns, v => v.width || 0);
}

// 列宽自适应
export function getSpareWidth<T>(clientWidth: number, columns: ColumnsProps<T>[]) {
  const totalWidth = getColumnsTotalWidth(columns);
  
  // 是否存在 width 为 undefined 的列
  const noWidthColumns = columns.filter(v => isUndefined(v.width));
  
  if (totalWidth > clientWidth) {
   if (!noWidthColumns.length) {
     return columns;
   }
   return columns.map(v =>
     isUndefined(v.width)
       ? {
         ...v,
         width: 150,
       }
       : v
   )}
  
  let spareTotalWidth = clientWidth;
  if (noWidthColumns.length) {
    spareTotalWidth = clientWidth - totalWidth;
  }
  
  const spareWidth = spareTotalWidth / (noWidthColumns.length || columns.length);
  
  return columns.map(v => {
    if (noWidthColumns.length && !isUndefined(v.width)) {
      return v;
    }
    return {
      ...v,
      width: spareWidth,
    }
  })
}