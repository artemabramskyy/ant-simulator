import { observable, action, computed } from 'mobx';
import configs from '~/configs';
import randomizer from '~/utils/randomizer';

const { grid, tickRate } = configs.app;

export default class AntStore {
  constructor(store) {
    this.rootStore = store;
  }

  @observable ant = configs.app.objects.ant;

  @observable antIntentions = [];

  @action _move = ({ direction }) => {
    switch (direction) {
      case 'right':
        if (this.ant.position.x + this.ant.velocity < grid.size) {
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
        if (this.ant.position.y + this.ant.velocity < grid.size) {
          this.ant.position.y += this.ant.velocity; // eslint-disable-line no-param-reassign
        }
        break;
    }
    this._lookingFor();
  }

  @action _lookingFor = () => {
    const { position, type, icon } = this.rootStore.honey.honey;
    const visionIndex = Object.keys(this.antVision)
      .find(av => this.antVision[av]?.x === position.x && this.antVision[av]?.y === position.y);

    this.antIntentions = [];

    if (visionIndex) {
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

      this.rootStore.realm.drawEntities([this.ant, this.rootStore.honey.honey]);
    });
  }

  @action initRandomMoves = () => {
    const interval = setInterval(() => {
      if (this.antIntentions.length) {
        if (this._getMovesListToIntention.length === 1) {
          this.ant.bag.push(this.rootStore.honey.honey);
          this.rootStore.honey.honey.onGrid = false;
          clearInterval(interval);
        }
        this._move({ direction: this._getMovesListToIntention[0] });
      } else {
        this._move({ direction: randomizer.getDirection() });
      }

      this.rootStore.realm.drawEntities([this.ant, this.rootStore.honey.honey]);
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
