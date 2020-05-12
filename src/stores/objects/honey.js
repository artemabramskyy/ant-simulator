import { observable } from 'mobx';
import configs from '~/configs';

class HoneyStore {
  @observable honeyPosition = configs.honey.position;
}

export default HoneyStore;
