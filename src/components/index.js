import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Main from '~/main';

const init = () => {
  const world = document.querySelector('#world');

  ReactDOM(Main , world);
};

init();