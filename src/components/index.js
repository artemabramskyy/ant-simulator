import ReactDOM from 'react-dom';

// Components
import Main from '~/components/main';

const init = () => {
  const world = document.querySelector('#world');

  ReactDOM.render(Main, world);
};

init();
