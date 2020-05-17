import React from 'react';
import { inject, observer } from 'mobx-react';
import configs from '~/configs';

// Components
import AntCell from '~/components/grid/cells/ant-cell';
import AntVisionCell from '~/components/grid/cells/ant-vision-cell';
import HoneyCell from '~/components/grid/cells/honey-cell';

const Cell = inject('antStore', 'honeyStore')(
  observer(({ antStore, honeyStore, column, line }) => {
    const { antPosition, antVision } = antStore;
    const { honey } = honeyStore;

    const _cellSize = () => ({
      width: `${40 / configs.app.grid.size.width * 20}px`, // eslint-disable-line no-mixed-operators
      height: `${40 / configs.app.grid.size.height * 20}px` // eslint-disable-line no-mixed-operators
    });

    const _isAnt = antPosition.y === column && antPosition.x === line;
    const _isAntVision = Object.keys(antVision).find(av => antVision[av].y === column && antVision[av].x === line);
    const _isHoney = honey.position.y === column && honey.position.x === line;

    return (
      <div
        style={_cellSize()}
        className='cell'
      >
        {_isAnt && <AntCell />}
        {_isAntVision && <AntVisionCell />}
        {_isHoney && <HoneyCell />}
        {configs.env.state === 'dev' ? `${column}-${line}` : ''}
      </div>
    );
  })
);

export default Cell;
