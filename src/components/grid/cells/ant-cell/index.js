import React from 'react';
import { inject, observer } from 'mobx-react';
import configs from '~/configs';

const AntCell = inject('antStore')(
  observer(({ antStore }) => {
    const { antBag } = antStore;

    return (
      <div className='ant'>
        {antBag.length ? <span>{antBag[0].icon}</span> : null}
        {configs.app.objects.ant.icon}
      </div>
    );
  })
);

export default AntCell;
