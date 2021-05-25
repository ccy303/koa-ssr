import React from 'react';
import Com from './compoment/com';
import './index.less';
export default props => {
  return (
    <div>
      props:{props.a}
      <p>msg:{props.msg}</p>
      1234567890123=
      <p>哈哈哈</p>
      <Com />
      <img src={require('./../../assets/haha.jpg')} alt='' />
    </div>
  );
};
