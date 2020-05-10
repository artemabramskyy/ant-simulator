import React from 'react';
import environment from '~/core/environment';

const Main = () => {
  console.log(environment.create());

  return <div>Space!</div>;
};

export default Main;
