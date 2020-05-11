// const position = { x: 0, y: 0 }
// const direction = 'right';
// const size = { widht: 5, height: 5 }
const ant = {
  color: 'red',
  velocity: 2, // number of cells per one tick
  move({ position, direction, size }) {
    switch (direction) {
      case 'right':
        if (position.x + 1 < size.height) {
          position.x += 1; // eslint-disable-line no-param-reassign
        }
        break;
      case 'left':
        if (position.x - 1 >= 0) {
          position.x -= 1; // eslint-disable-line no-param-reassign
        }
        break;
      case 'up':
        if (position.y - 1 >= 0) {
          position.y -= 1; // eslint-disable-line no-param-reassign
        }
        break;
      case 'down':
        if (position.y + 1 < size.height) {
          position.y += 1; // eslint-disable-line no-param-reassign
        }
        break;
    }
    return position;
  }
};

export default { ant };
