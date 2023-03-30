import React, { useRef, useState } from "react";

/**
 * 我们都知道当用useMemo,useCallback等API的时候，
 * 如果引用了useState，就要把useState值作为deps传入，
 * 否则由于useMemo,useCallback缓存了useState旧的值，
 * 无法得到新得值，但是useRef不同，可以直接读取/改变useRef里面缓存的数据。
 *
 * 同步useState
 * useState在一次使用useState改变state值之后，我们是无法获取最新的state,如下demo
 */

export function useImmediateState() {
  const count = useRef(0);
  
  const [_, forceUpdate] = useState(0);
  
  const onChange = () => {
    count.current++;
    forceUpdate(count.current);
    console.log(count.current);
  }
  
  return (
    <div>
      <button onChange={onChange}>update</button>
    </div>
  )
}
