import {useEffect, useLayoutEffect, useRef} from "react";
import {useCreation, useEventListener, useReactive} from "ahooks";

export interface VirtualState<T> {
  data: T[]; //渲染的数据
  scrollAllHeight: number; // 容器的初始高度
  listHeight: number; //列表高度
  renderCount: number; // 需要渲染的数量
  start: number; // 起始索引
  currentOffset: number; // 偏移量
}
export function useVirtual<T>({
  itemHeight, dataSource
}: {
  itemHeight: number;
  dataSource: T[];
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const state = useReactive<VirtualState<T>>({
    data: [] as T[], //渲染的数据
    scrollAllHeight: 0, // 容器的初始高度
    listHeight: 0, //列表高度
    renderCount: 0, // 需要渲染的数量
    start: 0, // 起始索引
    currentOffset: 0, // 偏移量
  });
  
  
  useEventListener('scroll', () => {
    const { scrollTop } = scrollRef.current as HTMLDivElement;
    const newStart = Math.ceil(scrollTop / itemHeight);
    state.start = newStart > 0 ? newStart - 1 : 0; // 顶部防抖
    state.currentOffset = scrollTop - (scrollTop % itemHeight)
  }, {target: scrollRef})
  
  useCreation(() => {
    state.data = dataSource.slice(state.start, state.start + state.renderCount);
  }, [state.start])
  
  
  useLayoutEffect(() => {
    const { offsetHeight } = wrapperRef.current as HTMLDivElement;
    state.scrollAllHeight = offsetHeight;
    state.renderCount = Math.ceil(offsetHeight / itemHeight) - 1; // 表头造成的影响
    state.listHeight = dataSource.length * itemHeight;
    state.data = dataSource.slice(0, state.renderCount);
  }, [wrapperRef?.current?.offsetHeight, dataSource?.length])
  
  // todo 初始化无法获取正确的 offsetHeight，暂时多执行一次useEffect
  useEffect(() => {
    const { offsetHeight } = wrapperRef.current as HTMLDivElement;
    state.scrollAllHeight = offsetHeight;
  }, [wrapperRef?.current?.offsetHeight, dataSource?.length])
  
  return { state, wrapperRef, scrollRef };
}