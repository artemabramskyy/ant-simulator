const _generateLine = ({ width, entity }) => {
  const line = [];

  for (let i = 0; i < width; i++) {
    line.push(entity);
  }

  return line;
}

const _generateColumn = ({ height, line }) => {
  const column = [];

  for (let i = 0; i < height; i++) {
    column.push(line);
  }

  return column;
}

const generate = ({ width, height, entity }) => {
  const space = [];
  const line = _generateLine({ width, entity });
  const column = _generateColumn({ height, line });

  for (let i = 0; i < width; i++) {
    space.push(column);
  }

  return space;
};

export default { generate };