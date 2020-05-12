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
    return {
      top: {
        y: this.antPosition.y - this.antVisionRadius,
        x: this.antPosition.x
      },
      rightTop: {
        y: this.antPosition.y - this.antVisionRadius,
        x: this.antPosition.x + this.antVisionRadius
      },
      right: {
        y: this.antPosition.y,
        x: this.antPosition.x + this.antVisionRadius
      },
      rightBottom: {
        y: this.antPosition.y + this.antVisionRadius,
        x: this.antPosition.x + this.antVisionRadius
      },
      bottom: {
        y: this.antPosition.y + this.antVisionRadius,
        x: this.antPosition.x
      },
      leftBottom: {
        y: this.antPosition.y + this.antVisionRadius,
        x: this.antPosition.x - this.antVisionRadius
      },
      left: {
        y: this.antPosition.y,
        x: this.antPosition.x - this.antVisionRadius,
      },
      leftTop: {
        y: this.antPosition.y - this.antVisionRadius,
        x: this.antPosition.x - this.antVisionRadius
      }
    };
  }

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
