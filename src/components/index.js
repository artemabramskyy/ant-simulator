import React from 'react';
import ReactDOM from 'react-dom';
import environment from '~/core/environment';

// Components
import Main from '~/components/main';

const init = () => {
  const env = environment.create({ width: 5, height: 5 });
  const root = document.querySelector('#root');

  console.log(env);

  ReactDOM.render(<Main />, root);
};

init();
