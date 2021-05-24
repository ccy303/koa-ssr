import React from 'react';
import ReactDom from 'react-dom';

export default score => {
  const state = window.__INITIAL_STATE__;
  const render = (App)=>{
    const root = document.getElementById('root');
    ReactDom.hydrate(<App {...state} />, root);
  };
  import().then(res => {
    render(res)
  })
};
