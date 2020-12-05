import AntStore from '~/store/objects/ant';
import HoneyStore from '~/store/objects/static/honey';
import BaseStore from '~/store/objects/static/base';
import RealmStore from '~/store/environment/realm';

export default class Store {
  constructor() {
    this.base = new BaseStore(this);
    this.honey = new HoneyStore(this);
    this.ant = new AntStore(this);
    this.realm = new RealmStore(this);
  }
}
