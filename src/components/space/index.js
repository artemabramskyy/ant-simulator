import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';

const Space = inject('space')(
  observer(({ space }) => {
    const { grid, createSpace, move, position } = space;

    useEffect(() => {
      createSpace();
      document.addEventListener('keypress', e => {
        switch (e.code) {
          case 'KeyW':
            move({ direction: 'up' });
            break;
          case 'KeyS':
            move({ direction: 'down' });
            break;
          case 'KeyA':
            move({ direction: 'left' });
            break;
          case 'KeyD':
            move({ direction: 'right' });
            break;
        }
      });
    }, []);

    return (
      grid && grid.map((column, ci) => (
        <div className='column' key={ci}>
          {column.map((line, li) => {
            const isAnt = position.y === ci && position.x === li;

            return <div className={`cell ${isAnt ? 'ant' : ''}`} key={`${ci}-${li}`}>{`${ci}-${li}`}</div>;
          })}
        </div>
      ))
    );
  })
);

export default Space;
