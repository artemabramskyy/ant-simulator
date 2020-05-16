import { observable } from 'mobx';
import configs from '~/configs';

class HoneyStore {
  @observable honey = configs.app.objects.static.honey;
}

export default HoneyStore;
