import { observable, action } from 'mobx';
import configs from '~/configs';
import World from '~/utils/world';
import grid from '~/utils/grid';

export default class RealmStore {
  constructor(store) {
    this.rootStore = store;

    this._initRealm();
    // this.rootStore.ant.initRandomMoves();
    this.rootStore.ant.initMoveSet();
    this.render();
  }

  @observable realm;

  @action
  _initRealm = () => {
    this.realm = new World({ gridSize: configs.app.grid.cells, canvasSize: configs.app.grid.size, grid });
  }

  @action
  render = () => {
    const entities = [this.rootStore.ant.ant];

    if (this.rootStore.honey.honey.onGrid) {
      entities.push(this.rootStore.honey.honey);
    }

    if (this.rootStore.base.base.onGrid) {
      entities.push(this.rootStore.base.base);
    }

    this.realm.render({ entities, vision: this.rootStore.ant.antVision });
  }
}
