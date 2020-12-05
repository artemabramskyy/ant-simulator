import { observable } from 'mobx';
import configs from '~/configs';

export default class HoneyStore {
  constructor(store) {
    this.rootStore = store;
  }

  @observable honey = configs.app.objects.static.honey;
}
