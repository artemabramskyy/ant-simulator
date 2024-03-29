import { observable, action, computed } from 'mobx';
import 'mobx-react-lite/batchingForReactDom';
import configs from '~/configs';
import randomizer from '~/utils/randomizer';

const { grid, tickRate } = configs.app;

export default class AntStore {
  constructor(store) {
    this.rootStore = store;
  }

  @observable ant = configs.app.objects.ant;

  @observable antIntentions = [];

  @observable antBag = [];

  @action _move = ({ direction }) => {
    switch (direction) {
      case 'right':
        if (this.ant.position.x + this.ant.velocity < grid.cells) {
          this.ant.position.x += this.ant.velocity; // eslint-disable-line no-param-reassign
        }
        break;
      case 'left':
        if (this.ant.position.x - this.ant.velocity >= 0) {
          this.ant.position.x -= this.ant.velocity; // eslint-disable-line no-param-reassign
        }
        break;
      case 'up':
        if (this.ant.position.y - this.ant.velocity >= 0) {
          this.ant.position.y -= this.ant.velocity; // eslint-disable-line no-param-reassign
        }
        break;
      case 'down':
        if (this.ant.position.y + this.ant.velocity < grid.cells) {
          this.ant.position.y += this.ant.velocity; // eslint-disable-line no-param-reassign
        }
        break;
    }
    this._lookingFor();
    this._takeInBag();
    this._putInBase();
  }

  @action _putInBase = () => {
    const { position } = this.rootStore.base.base;
    if (this.rootStore.base.base.onGrid) {
      if (this.ant.position.x === position.x && this.ant.position.y === position.y) {
        this.rootStore.base.put(this.antBag);
        this._removeFromBag();
      }
    }
  }

  @action _takeInBag = () => {
    const { position, type, icon } = this.rootStore.honey.honey;
    if (this.rootStore.honey.honey.onGrid) {
      if (this.ant.position.x === position.x && this.ant.position.y === position.y) {
        this.antBag.push({ type, icon });
        this.rootStore.honey.remove();
      }
    }
  }

  @action _removeFromBag = () => {
    this.antBag = [];
  }

  @action _lookingFor = () => {
    const { position, type, icon } = this.rootStore.honey.honey;
    const visionIndex = Object.keys(this.antVision)
      .find(av => this.antVision[av]?.x === position.x && this.antVision[av]?.y === position.y);

    this.antIntentions = [];

    if (visionIndex && this.rootStore.honey.honey.onGrid) {
      this.antIntentions.push({ position: this.antVision[visionIndex], type, icon });
    }
  }

  @action initMoveSet = () => {
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

      this.rootStore.realm.render();
    });
  }

  @action initRandomMoves = () => {
    const interval = setInterval(() => {
      if (this.antIntentions.length) {
        if (this._getMovesListToIntention.length === 1) {
          clearInterval(interval);
        }
        this._move({ direction: this._getMovesListToIntention[0] });
      } else {
        this._move({ direction: randomizer.getDirection() });
      }

      this.rootStore.realm.render();
    }, tickRate);
  }

  @computed get _getMovesListToIntention() {
    const movesList = [];
    const intentionPosition = this.antIntentions[0].position;

    if (this.ant.position.y < intentionPosition.y) {
      for (let { y } = this.ant.position; y < intentionPosition.y; y++) {
        movesList.push('down');
      }
    }

    if (this.ant.position.y > intentionPosition.y) {
      for (let { y } = this.ant.position; y > intentionPosition.y; y--) {
        movesList.push('up');
      }
    }

    if (this.ant.position.x < intentionPosition.x) {
      for (let { x } = this.ant.position; x < intentionPosition.x; x++) {
        movesList.push('right');
      }
    }

    if (this.ant.position.x > intentionPosition.x) {
      for (let { x } = this.ant.position; x > intentionPosition.x; x--) {
        movesList.push('left');
      }
    }

    return movesList;
  }

  @computed get antVision() {
    const rightBottom = {
      y: this.ant.position.y + this.ant.visionRadius,
      x: this.ant.position.x + this.ant.visionRadius
    };
    const leftTop = {
      y: this.ant.position.y - this.ant.visionRadius,
      x: this.ant.position.x - this.ant.visionRadius
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
