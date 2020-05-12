import { observable, action } from 'mobx';
import configs from '~/configs';

class AntStore {
  @observable position = { x: 0, y: 0 };

  @observable color = 'red';

  @observable velocity = 2;

  @observable size = configs.size;

  @action move = ({ direction }) => {
    switch (direction) {
      case 'right':
        if (this.position.x + 1 < this.size.height) {
          this.position.x += 1; // eslint-disable-line no-param-reassign
        }
        break;
      case 'left':
        if (this.position.x - 1 >= 0) {
          this.position.x -= 1; // eslint-disable-line no-param-reassign
        }
        break;
      case 'up':
        if (this.position.y - 1 >= 0) {
          this.position.y -= 1; // eslint-disable-line no-param-reassign
        }
        break;
      case 'down':
        if (this.position.y + 1 < this.size.height) {
          this.position.y += 1; // eslint-disable-line no-param-reassign
        }
        break;
    }
  }

  @action initAntMoveSet = () => {
    document.addEventListener('keypress', e => {
      switch (e.code) {
        case 'KeyW':
          this.move({ direction: 'up' });
          break;
        case 'KeyS':
          this.move({ direction: 'down' });
          break;
        case 'KeyA':
          this.move({ direction: 'left' });
          break;
        case 'KeyD':
          this.move({ direction: 'right' });
          break;
      }
    });
  }
}

export default AntStore;
