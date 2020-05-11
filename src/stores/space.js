import { observable, action } from 'mobx';
import configs from '~/configs';
import environment from '~/core/environment';

class Space {
  @observable grid;

  @action createSpace = () => {
    this.grid = environment.create(configs);
  }
}

export default Space;
