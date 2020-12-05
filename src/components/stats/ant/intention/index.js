import React from 'react';
import { inject, observer } from 'mobx-react';

const AntIntention = inject('store')(
  observer(({ store }) => {
    const { antIntentions, antBag } = store.ant;
    const { base } = store.base;
    const { storage } = base;

    return (
      <div className='stats'>
        <div className='intention'>
          {antIntentions?.map((ai, i) => (
            <div className='intention-item' key={i}>
              ++INTENTION++
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
        <div className='base'>
          {storage?.map((ab, i) => (
            <div className='base-storage' key={i}>
              ++Base Storage++
              <span>
                Type:
                {ab.type}
              </span>
              <span>
                Icon:
                {ab.icon}
              </span>
            </div>
          )
          )}
        </div>
        <div className='bag'>
          {antBag?.map((ab, i) => (
            <div className='intention-item' key={i}>
              ++BAG++
              <span>
                Type:
                {ab.type}
              </span>
              <span>
                Icon:
                {ab.icon}
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
