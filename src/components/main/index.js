import React from 'react';
import { Provider } from 'mobx-react';

// Store
import stores from '~/stores';

// Components
import Grid from '~/components/grid';

const Main = () => (
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  <Provider {...stores}>
    <div className='container'>
      <Grid />
    </div>
  </Provider>
);

export default Main;
