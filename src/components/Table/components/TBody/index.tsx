import React from 'react';
import {BaseRowKey, ColumnsProps} from "../../Types";
import Row from "../../Row";
import {getValueByKey} from "../../utils";

interface Props<T> {
  columns: ColumnsProps<T>[];
  currentOffset: number;
  dataSource: T[];
  rowKey: BaseRowKey<T>;
}
function Tbody<T>(props: Props<T>) {
  const {
    columns,
    currentOffset,
    dataSource,
    rowKey,
  } = props;
  
  return (
    <div role="tableBody" style={{
      transform: `translate3d(0, ${currentOffset}px, 0)`,
      position: 'relative', left: 0, top: 0, right: 0,
    }}>
      {
        dataSource.map(record => {
          return (
            <Row<T>
              record={record}
              key={getValueByKey<T, React.Key>(record, rowKey)}
              columns={columns}
            />
          )
        })
      }
    </div>
  );
}

export default Tbody;