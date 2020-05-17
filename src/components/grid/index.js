import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

// Components
import Cell from './cells';

const Grid = inject('gridStore', 'antStore')(
  observer(({ gridStore, antStore }) => {
    const { grid } = gridStore;
    const { antInitMoveSet, initRandomMoves } = antStore;

    useEffect(() => {
      // antInitMoveSet(); // For manual management
      initRandomMoves();
    }, []);

    return (
      <div className='wrapper'>
        {grid && grid.map((column, ci) => (
          <div className='column' key={ci}>
            {column.map((line, li) => (
              <Cell column={li} line={ci} key={`${ci}-${li}`} />
            ))}
          </div>
        ))}
      </div>
    );
  })
);

export default Grid;
