const _generateLine = ({ width, entity }) => {
  const line = [];

  for (let i = 0; i < width; i++) {
    line.push(entity);
  }

  return line;
};

const _generateColumns = ({ height, line }) => {
  const columns = [];

  for (let i = 0; i < height; i++) {
    columns.push(line);
  }

  return columns;
};

const generate = ({ width, height, entity }) => {
  const line = _generateLine({ width, entity });
  const columns = _generateColumns({ height, line });

  return columns;
};

export default { generate };
