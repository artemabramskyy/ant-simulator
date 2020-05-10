import React from 'react';
import { Provider } from 'mobx-react';

// Store
import stores from '~/stores';

// Components
import Space from '~/components/space';

const Main = () => (
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  <Provider {...stores}>
    <Space />
  </Provider>
);

export default Main;
