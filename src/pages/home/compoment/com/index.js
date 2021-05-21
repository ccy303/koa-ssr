import React from 'react';
import './index.less';
export default props => {
  const click = () => {
    console.log('hahahah');
  };
  return (
    <>
      这是一个组件
      <p className='text' onClick={click}>
        哈哈哈哈
      </p>
    </>
  );
};
