import { observable, action, computed } from 'mobx';
import configs from '~/configs';

class AntStore {
  constructor({ statickObjects }) {
    this.statickObjects = statickObjects;
  }

  @observable antPosition = configs.ant.position;

  @observable antColor = configs.ant.color;

  @observable antVelocity = configs.ant.velocity;

  @observable antSize = configs.size;

  @observable antVisionRadius = configs.ant.visionRadius;

  @observable antIntentions = [];

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
    this._lookingFor();
  }

  @action _lookingFor = () => {
    const { position, type, icon } = this.statickObjects.honeyStore.honey;
    const visionIndex = Object.keys(this.antVision)
      .find(av => this.antVision[av]?.x === position.x && this.antVision[av]?.y === position.y);

    this.antIntentions = [];

    if (visionIndex) {
      this.antIntentions.push({ position: this.antVision[visionIndex], type, icon });
    }
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
}

export default AntStore;
