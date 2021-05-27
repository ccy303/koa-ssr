import React from 'react';
import './index.less';
import '../../style/global.less';
export default props => {
  return (
    <div className='content'>
      哈哈哈 另外一个组件
      <button
        onClick={() => {
          console.log(23467);
        }}
      >
        按钮
      </button>
    </div>
  );
};
