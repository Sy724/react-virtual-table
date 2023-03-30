import React, {ReactElement, useLayoutEffect, useMemo, useRef, useState} from 'react';

const useDraggable = () => {
  const lastOffset = useRef({
    x: 0, // 当前 x 坐标
    y: 0, // 当前 y 坐标
    X: 0, // 上次 x 坐标
    Y: 0, // 上次 y 坐标
  });
  
  const currentDom = useRef<ReactElement>();
  
  const [_, forceUpdate] = useState({});
  
  const [ontouchstart, ontouchmove, ontouchend] = useMemo(() => {
    const currentOffset: any = {}
    const touchStart = function (e: any) {
      const targetTouch = e;
      currentOffset.X = targetTouch.clientX;
      currentOffset.Y = targetTouch.clientY;
    };
    
    const touchMove = function (e: any) {
      const targetM = e;
      
      let x = lastOffset.current.X + targetM.clientX - currentOffset.X;
      let y = lastOffset.current.Y + targetM.clientY - currentOffset.Y;
      
      lastOffset.current.x = x;
      lastOffset.current.y = y;
      forceUpdate({x, y})
    }
    
    const touchEnd = () => {
      lastOffset.current.X = lastOffset.current.x;
      lastOffset.current.Y = lastOffset.current.y;
    }
    
    return [touchStart, touchMove, touchEnd]
  }, []);
  
  useLayoutEffect(() => {
    const dom = currentDom.current;
    // @ts-ignore
    dom.ondragstart = ontouchstart;
    // @ts-ignore
    dom.ondragover = ontouchmove;
    // @ts-ignore
    dom.ondragend = ontouchend;
  }, [])
  
  return [{x: lastOffset.current.x, y: lastOffset.current.y}, currentDom];
}

export default useDraggable;