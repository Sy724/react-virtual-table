import React from 'react';
import useDraggable from "./index";

const DraggableDemo = () => {

  const [style, dropRef] = useDraggable();
  
  return (
    <div style={{
      width: '400px',
      height: '800px',
      position: 'relative',
      backgroundColor: '#999'
    }}>
      <div
        draggable={true}
        style={{
          width: '80px',
          height: '80px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '40px',
          backgroundColor: 'darkred',
          transform:`translate(${style.x}px, ${style.y}px)`
        }}
        ref={dropRef}
      >
        <span>dropBox</span>
      </div>
    </div>
  );
}

export default DraggableDemo;