import { observable } from 'mobx';
import configs from '~/configs';

class HoneyStore {
  @observable honey = configs.honey;
}

export default HoneyStore;
