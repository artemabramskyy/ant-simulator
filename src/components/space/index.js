import React from 'react';
import { inject, observer } from 'mobx-react';

const Space = inject('space')(
  observer(({ space }) => {
    const { grid } = space;

    console.log(grid);

    return <div>here</div>;
  })
);

export default Space;
