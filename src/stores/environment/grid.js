import { observable } from 'mobx';
import configs from '~/configs';
import gridUtil from '~/utils/grid';

class GridStore {
  @observable grid = gridUtil.generate({ ...configs.size, entity: [] });
}

export default GridStore;
