import React from 'react';
import ReactDom from 'react-dom';

export default (score, state, type = 'hydrate') => {
  const render = App => {
    const root = document.getElementById('root');
    ReactDom[type](<App {...state} />, root);
  };
  render(score);
};
