import React, {useMemo} from 'react';
import {ColumnsProps} from "./Types";
import {sumBy} from "lodash-es";
import {getColumnsTotalWidth, getSpareWidth} from "./utils";

interface Props<T> {
  tableId: React.Key;
  columns: ColumnsProps<T>[]
  itemHeight: number;
  clientWidth?: number;
  bordered?: boolean;
}
function Style<T>(props: Props<T>) {
  const {
    clientWidth = 0,
    columns: columnsProps,
    itemHeight,
    tableId,
    bordered,
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
          border-right: ${bordered ? '1px solid #f0f0f0' : 'none'};
          white-space: nowrap;
          word-break: break-all;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        #${tableId} [role=table] {
          width: ${totalWidth}px;
          border-bottom: ${bordered ? '1px solid #f0f0f0' : 'none'};
        }
        
        #${tableId} [role=tableBody] [role=tableRow]:last-child {
          border-bottom: none;
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
          border-bottom: ${bordered ? '1px solid #f0f0f0' : 'none'};
        }
        
        #${tableId} [role=tableHeader] .Cells:last-child {
          border-right: none;
        }
        #${tableId} [role=tableRow] .Cells:last-child {
          border-right: none;
        }
        
        #${tableId} [role=tableRow]:hover .Cells {
          background: #f5f5f5
        }
        
        #${tableId} .tableHeader {
          position: sticky;
          top: 0;
          z-index: 100;
          background-color: #e9edf2;
        }
        
        
        #${tableId} [role=tableFill] {
          position: relative;
          z-index: -1;
          background-color: transparent;
        }
      `}
    
    </style>
  );
}

export default Style;