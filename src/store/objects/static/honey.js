import { observable, action } from 'mobx';
import configs from '~/configs';

export default class HoneyStore {
  constructor(store) {
    this.rootStore = store;
  }

  @observable honey = configs.app.objects.static.honey;

  @action remove = () => {
    this.honey.onGrid = false;
  }

  @action add = () => {
    this.honey.onGrid = true;
  }
}
