import React, {useEffect} from 'react';
import {useReactive, useSize} from "ahooks";
import {uniqueId} from "lodash-es";
import Row from "./Row";
import {TableProps} from "./Types";
import {useVirtual} from "./hooks/useVirtual";
import {getValueByKey} from "./utils";
import Style from "./Style";
import THeader from "./components/THeader";
import TBody from "./components/TBody";

function Table<T>({
  rowKey,
  columns = [],
  dataSource = [],
  itemHeight = 48,
  scroll = { y: '100%' },
  bordered = false,
}: TableProps<T>) {
  
  const tableState = useReactive<{
    dataSource: T[]
  }>({
    dataSource,
  })
  
  useEffect(() => {
    tableState.dataSource = dataSource;
  }, [dataSource])
  
  const {state, wrapperRef, scrollRef} = useVirtual<T>({
    itemHeight,
    dataSource: tableState.dataSource,
  });
  
  const scrollRefSize = useSize(wrapperRef);
  
  // 生成唯一 id 用于区分一个页面多个列表
  const tableId = uniqueId('virtualTable_');
  
  const excludeFixedColumnsLength = columns.filter(v => !v?.fixed).length;
  
  // todo： fix列、serverSide
  return (
    <div>
      <Style<T>
        clientWidth={scrollRefSize?.width}
        columns={columns}
        itemHeight={itemHeight}
        tableId={tableId}
        bordered={bordered}
      />
      <div ref={wrapperRef} id={tableId}>
        {/* 占位，列表总高度 */}
        <div role="table" ref={scrollRef} style={{
          backgroundColor: '#fff',
          color: '#666',
          overflow: "auto",
          maxHeight: scroll?.y,
        }}>
          {/* 表头*/}
          <THeader<T> columns={columns} />
          
          {/* 表体 */}
          <TBody<T>
            rowKey={rowKey}
            columns={columns}
            currentOffset={state.currentOffset}
            dataSource={state.data} // 使用 useVirtual 控制当前渲染数据
          />
          
      
          {/* 占位 */}
          <div
            role="tableFill"
            style={{
              height: state.listHeight - (state.renderCount * itemHeight),
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Table;