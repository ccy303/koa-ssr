import React from 'react';
import './index.less';
import Com from './compoment/com';
export default props => {
  return (
    <div>
      1234
      <Com />
      <img src={require('./../../assets/haha.jpg')} alt="" />
    </div>
  );
};
