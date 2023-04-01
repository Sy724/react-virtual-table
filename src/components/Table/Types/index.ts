import React, {ReactNode} from "react";

export interface ColumnsProps<T> {
  title: string;
  key: string;
  width?: number;
  align?: 'left' | 'center' | 'right';
  fixed?: 'left' | 'right';
  render: (record: T) => ReactNode;
}

export type BaseRowKey<T> = string | ((record: T) => React.Key);

export interface TableProps<T> {
  rowKey: BaseRowKey<T>;
  columns: ColumnsProps<T>[];
  dataSource: T[];
  itemHeight?: number;
  scroll?: {
    x?: string;
    y?: string;
  };
}