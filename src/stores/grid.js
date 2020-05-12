import { observable, action } from 'mobx';
import configs from '~/configs';
import environment from '~/core/environment';

class GridStore {
  @observable grid;

  @action createGrid = () => {
    this.grid = environment.create(configs.size);
  }
}

export default GridStore;
