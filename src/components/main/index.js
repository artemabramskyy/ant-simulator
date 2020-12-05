import React from 'react';
import { Provider } from 'mobx-react';

// Store
import Store from '~/store';

// Components
import Stats from '~/components/stats';

const store = new Store();

const Main = () => (
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  <Provider store={store}>
    <div className='container'>
      <Stats />
    </div>
  </Provider>
);

export default Main;
