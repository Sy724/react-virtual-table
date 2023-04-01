import React from 'react';
import styles from "../../index.module.scss";
import {ColumnsProps} from "../../Types";

interface Props<T> {
  columns: ColumnsProps<T>[];
}
function THeader<T>(props: Props<T>) {
  const {columns} = props;
  return (
    <>
      {/* todo 表头、grid 布局*/}
      <div role="tableHeader" className="tableHeader">
        {
          columns.map(column => (
            <div key={`tableHeader-${column.key}`} className="Cells" style={{
              padding: '2px',
              textAlign: column.align,
            }}>
              {column.title}
            </div>
          ))
        }
      </div>
    </>
  );
}

export default THeader;