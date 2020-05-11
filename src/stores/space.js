import { observable, action, toJS } from 'mobx';
import configs from '~/configs';
import environment from '~/core/environment';
import ant from '~/core/objects/ant';

class Space {
  @observable grid;

  @observable position = { x: 0, y: 0 };

  @action createSpace = () => {
    this.grid = environment.create(configs);
  }

  @action move = ({ direction }) => {
    this.position = ant.ant.move({ position: this.position, direction, size: configs });
    console.log(toJS(this.position));
  }
}

export default Space;
