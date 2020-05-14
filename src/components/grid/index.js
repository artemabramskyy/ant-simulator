import React, { useEffect } from 'react';
import { inject, observer } from 'mobx-react';
import classesUtil from '~/utils/classesMaker';

const Grid = inject('gridStore', 'antStore', 'honeyStore')(
  observer(({ gridStore, antStore, honeyStore }) => {
    const { grid } = gridStore;
    const { antInitMoveSet,
      antPosition,
      antVision } = antStore;
    const { honey } = honeyStore;

    useEffect(() => {
      antInitMoveSet();
    }, []);

    const _classesLine = ({ column, line }) => classesUtil.generateClasses({
      column,
      line,
      antPosition,
      antVision,
      honeyPosition: honey.position
    });

    return (
      <div className='wrapper'>
        {grid && grid.map((column, ci) => (
          <div className='column' key={ci}>
            {column.map((line, li) => (
              <div
                className={`cell ${_classesLine({ column: ci, line: li })}`}
                key={`${ci}-${li}`}
              >
                {`${ci}-${li}`}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  })
);

export default Grid;
