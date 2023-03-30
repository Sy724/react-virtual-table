import React, {useEffect, useLayoutEffect, useRef} from 'react';
import {useCreation, useEventListener, useReactive} from "ahooks";
import Row from "./Row";
import {TableProps} from "./Types";
import { get } from 'lodash-es';
function getValueByKey<T, KeyResult>(
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

function Table<T>({
  rowKey,
  columns = [],
  dataSource = [],
  itemHeight = 48,
  scroll = { y: '100vh' },
}: TableProps<T>) {
  const wrapperRef = useRef<any>(null);
  const scrollRef = useRef<any>(null);
  
  const state = useReactive({
    data: [] as T[], //渲染的数据
    scrollAllHeight: 0, // 容器的初始高度
    listHeight: 0, //列表高度
    renderCount: 0, // 需要渲染的数量
    start: 0, // 起始索引
    currentOffset: 0, // 偏移量
  });
  
  useEventListener('scroll', () => {
    const { scrollTop } = scrollRef.current;
    const newStart = Math.ceil(scrollTop / itemHeight);
    state.start = newStart > 0 ? newStart - 1 : 0; // 顶部防抖
    state.currentOffset = scrollTop - (scrollTop % itemHeight)
  }, {target: scrollRef})
  
  useCreation(() => {
    state.data = dataSource.slice(state.start, state.start + state.renderCount);
  }, [state.start])
  
  
  useLayoutEffect(() => {
    const { offsetHeight } = wrapperRef.current;
    state.scrollAllHeight = offsetHeight;
    state.renderCount = Math.ceil(offsetHeight / itemHeight) + 1;
    state.listHeight = dataSource.length * itemHeight;
    state.data = dataSource.slice(0, state.renderCount);
  }, [wrapperRef?.current?.offsetHeight, dataSource?.length])
  
  // todo 初始化无法获取正确的 offsetHeight，暂时多执行一次useEffect
  useEffect(() => {
    const { offsetHeight } = wrapperRef.current;
    state.scrollAllHeight = offsetHeight;
  }, [wrapperRef?.current?.offsetHeight, dataSource?.length])
  
  
  return (
    <div>
      <div ref={wrapperRef} id="wrapperRef">
        {/* 占位，列表总高度 */}
        <div ref={scrollRef} style={{
          backgroundColor: '#fff',
          color: '#666',
          overflow: "auto",
          maxHeight: scroll?.y,
        }}>
          {/* todo 表头、grid 布局*/}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            position: 'sticky',
            top: 0,
            zIndex: '100'
          }}>
            {
              columns.map(column => (
                <div key={`tableHeader-${column.key}`} style={{
                  width: column.width,
                  backgroundColor: '#e9edf2',
                  padding: '2px',
                  textAlign: column.align,
                  height: `${itemHeight}px`,
                  lineHeight: `${itemHeight}px`,
                }}>
                  {column.title}
                </div>
              ))
            }
          </div>
          <div style={{
            transform: `translate3d(0, ${state.currentOffset}px, 0)`,
            position: 'relative', left: 0, top: 0, right: 0,
          }}>
            {
              state.data.map(record => {
                return (
                  <Row<T>
                    itemHeight={itemHeight}
                    record={record}
                    key={getValueByKey<T, React.Key>(record, rowKey)}
                    columns={columns}
                  />
                )
              })
            }
          </div>
      
          {/* 占位 */}
          <div style={{
            height: state.listHeight - (state.renderCount * itemHeight),
            position: 'relative',
            zIndex: '-1',
            backgroundColor: 'transparent',
          }}></div>
        </div>
      </div>
    </div>
  );
}

export default Table;