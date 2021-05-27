import React from 'react';
import './index.less';
import './../../../../style/global.less';
export default props => {
  const click = () => {
    console.log('hahahah123');
  };
  return (
    <div>
      <button onClick={click}>点击事件</button>
      这是一个组件111
      <p className='text'>哈哈哈哈12</p>
    </div>
  );
};
