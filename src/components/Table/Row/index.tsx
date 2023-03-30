import React from 'react';
import {ColumnsProps} from "../Types";
function Row<T>(props: {
  record: T;
  columns: ColumnsProps<T>[];
  itemHeight: number;
}) {
  const { record, columns, itemHeight } = props;
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      flexWrap: "nowrap",
      height: itemHeight,
    }}>
      {
        columns.map(column => {
          return (
            <div key={column.key} style={{
              width: column.width,
              display: "flex",
              alignItems: "center",
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
              padding: '2px',
              textAlign: column.align,
            }}>
            <span>
              {column.render(record)}
            </span>
            </div>
          )
        })
      }
    </div>
  );
}

export default Row;