import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

const Space = inject('space')(
  observer(({ space }) => {
    const { grid, createSpace } = space;

    useEffect(() => {
      createSpace();
    }, []);

    return (
      grid && grid.map((column, ci) => (
        <div className='column' key={ci}>
          {column.map((line, li) => <div className='cell' key={`${ci}-${li}`}>{`${ci}-${li}`}</div>)}
        </div>
      ))
    );
  })
);

export default Space;
