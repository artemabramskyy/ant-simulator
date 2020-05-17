import React from 'react';
import { inject, observer } from 'mobx-react';

const HoneyCell = inject('honeyStore')(
  observer(({ honeyStore }) => {
    const { honey } = honeyStore;

    return (
      honey.onGrid && (
      <div>
        {honey.icon}
      </div>
      )
    );
  })
);

export default HoneyCell;
