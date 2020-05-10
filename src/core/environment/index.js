import entity from '~/core/environment/entity';
import space from '~/core/environment/space';

const create = ({ width, height }) => space.generate({ width, height, entity: entity.generate });

export default { create };