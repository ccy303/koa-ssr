import React from 'react';
import './index.less';
import './../../../../style/global.less';
export default props => {
  const click = () => {
    console.log('hahahah123');
  };
  return (
    <div>
      这是一个组件11
      <p className='text' onClick={click}>
        哈哈哈哈12
      </p>
    </div>
  );
};
