import { observable } from 'mobx';
import configs from '~/configs';
import gridUtil from '~/utils/grid';

class GridStore {
  @observable grid = gridUtil.generate({ ...configs.app.grid.size, entity: [] });
}

export default GridStore;
