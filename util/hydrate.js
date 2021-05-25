import React from 'react';
import { hydrate } from 'react-dom';

export default (score, state) => {
  const render = (App) => {
    const root = document.getElementById('root');
    hydrate(<App {...state} />, root);
  };
  render(score)
};
