import React from 'react';
import ReactDOM from 'react-dom';

// Components
import Main from '~/components/main';

const init = () => {
  const root = document.querySelector('#root');

  ReactDOM.render(<Main />, root);
};

init();
