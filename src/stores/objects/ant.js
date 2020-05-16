import { observable, action, computed } from 'mobx';
import configs from '~/configs';

const { velocity, visionRadius } = configs.app.objects.ant;
const { grid } = configs.app.grid;

class AntStore {
  constructor({ staticObjects }) {
    this.staticObjects = staticObjects;
  }

  @observable antPosition = configs.app.objects.ant.position;

  @observable antIntentions = [];

  @action _move = ({ direction }) => {
    switch (direction) {
      case 'right':
        if (this.antPosition.x + velocity < grid.size.width) {
          this.antPosition.x += velocity; // eslint-disable-line no-param-reassign
        }
        break;
      case 'left':
        if (this.antPosition.x - velocity >= 0) {
          this.antPosition.x -= velocity; // eslint-disable-line no-param-reassign
        }
        break;
      case 'up':
        if (this.antPosition.y - velocity >= 0) {
          this.antPosition.y -= velocity; // eslint-disable-line no-param-reassign
        }
        break;
      case 'down':
        if (this.antPosition.y + velocity < grid.size.height) {
          this.antPosition.y += velocity; // eslint-disable-line no-param-reassign
        }
        break;
    }
    this._lookingFor();
  }

  @action _lookingFor = () => {
    const { position, type, icon } = this.staticObjects.honeyStore.honey;
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
      y: this.antPosition.y + visionRadius,
      x: this.antPosition.x + visionRadius
    };
    const leftTop = {
      y: this.antPosition.y - visionRadius,
      x: this.antPosition.x - visionRadius
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
