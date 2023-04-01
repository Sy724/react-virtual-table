import React, {useMemo} from 'react';
import {ColumnsProps} from "./Types";
import {sumBy} from "lodash-es";
import {getColumnsTotalWidth, getSpareWidth} from "./utils";

interface Props<T> {
  tableId: React.Key;
  columns: ColumnsProps<T>[]
  itemHeight: number;
  clientWidth?: number;
}
function Style<T>(props: Props<T>) {
  const {
    clientWidth = 0,
    columns: columnsProps,
    itemHeight,
    tableId,
  } = props;
  
  
  const columns = useMemo(
  () => getSpareWidth(clientWidth, columnsProps),
  [clientWidth, columnsProps],
  )
  
  const totalWidth = getColumnsTotalWidth(columns);
  
  return (
    <style>
      {`
        #${tableId} .Cells {
          height: ${itemHeight}px;
          line-height: ${itemHeight}px;
          padding: 2px;
        }
        #${tableId} [role=table] {
          width: ${totalWidth}px
        }
        
        #${tableId} [role=tableHeader],
        #${tableId} [role=tableRow] {
          display: grid;
          grid-template-columns: ${columns.map((col) => `
            ${col?.width}px
           `).join(' ')};
           
          overflow: hidden;
          whiteSpace: nowrap;
          textOverflow: ellipsis;
        }
        
        #${tableId} .tableHeader {
          position: sticky;
          top: 0;
          z-index: 100;
          background-color: #e9edf2;
        }
        
        
        #${tableId} [role=tableFill] {
          ppsition: relative;
          z-inde: -1;
          background-color: transparent;
        }
      `}
    
    </style>
  );
}

export default Style;