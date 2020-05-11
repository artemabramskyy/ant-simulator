import React from 'react';
import { Provider } from 'mobx-react';

// Store
import stores from '~/stores';

// Components
import Space from '~/components/space';

const Main = () => (
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  <Provider {...stores}>
    <div className='container'>
      <Space />
    </div>
  </Provider>
);

export default Main;
