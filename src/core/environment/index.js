import grid from '~/core/environment/grid';

const create = ({ width, height }) => grid.generate({ width, height, entity: [] });

export default { create };
