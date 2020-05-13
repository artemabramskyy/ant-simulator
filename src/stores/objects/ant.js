import { observable, action, computed } from 'mobx';
import configs from '~/configs';

class AntStore {
  @observable antPosition = configs.ant.position;

  @observable antColor = configs.ant.color;

  @observable antVelocity = configs.ant.velocity;

  @observable antSize = configs.size;

  @observable antVisionRadius = configs.ant.visionRadius;

  @action _move = ({ direction }) => {
    switch (direction) {
      case 'right':
        if (this.antPosition.x + this.antVelocity < this.antSize.height) {
          this.antPosition.x += this.antVelocity; // eslint-disable-line no-param-reassign
        }
        break;
      case 'left':
        if (this.antPosition.x - this.antVelocity >= 0) {
          this.antPosition.x -= this.antVelocity; // eslint-disable-line no-param-reassign
        }
        break;
      case 'up':
        if (this.antPosition.y - this.antVelocity >= 0) {
          this.antPosition.y -= this.antVelocity; // eslint-disable-line no-param-reassign
        }
        break;
      case 'down':
        if (this.antPosition.y + this.antVelocity < this.antSize.height) {
          this.antPosition.y += this.antVelocity; // eslint-disable-line no-param-reassign
        }
        break;
    }
  }

  @computed get antVision() {
    const rightBottom = {
      y: this.antPosition.y + this.antVisionRadius,
      x: this.antPosition.x + this.antVisionRadius
    };
    const leftTop = {
      y: this.antPosition.y - this.antVisionRadius,
      x: this.antPosition.x - this.antVisionRadius
    };
    const visionArea = [];

    for (let { y } = leftTop; y <= rightBottom.y; y++) {
      for (let { x } = leftTop; x <= rightBottom.x; x++) {
        visionArea.push({ y, x });
      }
    }

    return visionArea;
  }

  // @computed get sawSomething() {

  // }

  @action antInitMoveSet = () => {
    document.addEventListener('keypress', e => {
      switch (e.code) {
        case 'KeyW':
          this._move({ direction: 'up' });
          break;
        case 'KeyS':
          this._move({ direction: 'down' });
          break;
        case 'KeyA':
          this._move({ direction: 'left' });
          break;
        case 'KeyD':
          this._move({ direction: 'right' });
          break;
      }
    });
  }
}

export default AntStore;
