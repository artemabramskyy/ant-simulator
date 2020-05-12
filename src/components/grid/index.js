import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

const Grid = inject('gridStore', 'antStore')(
  observer(({ gridStore, antStore }) => {
    const { grid, createGrid } = gridStore;
    const { initAntMoveSet, position } = antStore;

    useEffect(() => {
      createGrid();
      initAntMoveSet();
    }, []);

    return (
      <div className='wrapper'>
        {grid && grid.map((column, ci) => (
          <div className='column' key={ci}>
            {column.map((line, li) => {
              const isAnt = position.y === ci && position.x === li;

              return <div className={`cell ${isAnt ? 'ant' : ''}`} key={`${ci}-${li}`} />;
            })}
          </div>
        ))}
      </div>
    );
  })
);

export default Grid;
