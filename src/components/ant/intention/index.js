import React from 'react';
import { inject, observer } from 'mobx-react';

const AntIntention = inject('antStore')(
  observer(({ antStore }) => {
    const { antIntentions } = antStore;

    return (
      <div className='stats'>
        <div className='intention'>
          {antIntentions?.map((ai, i) => (
            <div className='intention-item' key={i}>
              <span>
                Position:
                {ai.position.x}
                -
                {ai.position.y}
              </span>
              <span>
                Type:
                {ai.type}
              </span>
              <span>
                Icon:
                {ai.icon}
              </span>
            </div>
          )
          )}
        </div>
      </div>

    );
  })
);

export default AntIntention;
