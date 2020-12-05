import AntStore from '~/store/objects/ant';
import HoneyStore from '~/store/objects/static/honey';
import RealmStore from '~/store/environment/realm';

export default class Store {
  constructor() {
    this.honey = new HoneyStore(this);
    this.ant = new AntStore(this);
    this.realm = new RealmStore(this);
  }
}
