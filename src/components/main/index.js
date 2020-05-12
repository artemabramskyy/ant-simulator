import React from 'react';
import { Provider } from 'mobx-react';

// Configs
import configs from '~/configs';

// Store
import stores from '~/stores';

// Components
import Grid from '~/components/grid';

const Main = () => (
  /* eslint-disable-next-line react/jsx-props-no-spreading */
  <Provider {...stores}>
    <div className={`container ${configs.env}`}>
      <Grid />
    </div>
  </Provider>
);

export default Main;
