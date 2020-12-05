import { observable, action } from 'mobx';
import configs from '~/configs';

export default class BaseStore {
  constructor(store) {
    this.rootStore = store;
  }

  @observable base = configs.app.objects.static.base;

  @action remove = () => {
    this.base.onGrid = false;
  }

  @action put = items => {
    this.base.storage = [...this.base.storage, ...items];
  }
}
