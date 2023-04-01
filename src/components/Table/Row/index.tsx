import React from 'react';
import {ColumnsProps} from "../Types";
function Row<T>(props: {
  record: T;
  columns: ColumnsProps<T>[];
}) {
  const { record, columns } = props;
  return (
    <div role="tableRow">
      {
        columns.map(column => {
          return (
            <div key={column.key} className="Cells" style={{
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