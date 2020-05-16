const getDirection = () => {
  const seed = Math.random() * Math.floor(4);

  if (seed < 1) return 'up';
  if (seed >= 1 && seed < 2) return 'right';
  if (seed >= 2 && seed < 3) return 'down';
  if (seed >= 3 && seed <= 4) return 'left';

  throw new Error('Can\'t get any direction');
};

export default { getDirection };
