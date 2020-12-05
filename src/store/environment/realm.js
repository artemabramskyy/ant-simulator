import { observable, action } from 'mobx';
import configs from '~/configs';
import World from '~/utils/world';
import grid from '~/utils/grid';

export default class RealmStore {
  constructor(store) {
    this.rootStore = store;

    this._initRealm();
    this.rootStore.ant.initRandomMoves();
    this.drawEntities([this.rootStore.ant.ant, this.rootStore.honey.honey]);
  }

  @observable realm;

  @action
  _initRealm = () => {
    this.realm = new World({ gridSize: configs.app.grid.cells, canvasSize: configs.app.grid.size, grid });
  }

  @action
  drawEntities = entities => {
    this.realm.render(entities);
  }
}
