export default class World {
  constructor({ gridSize, canvasSize, grid }) {
    this._grid = grid.generate({ width: gridSize, height: gridSize, entity: [] });
    this._cellSize = canvasSize / gridSize;
    this._canvasSize = canvasSize;

    this._init();
  }

  _init() {
    const body = document.getElementsByTagName('body')[0];
    const canvasElement = document.createElement('canvas');

    canvasElement.id = 'grid';
    canvasElement.width = this._canvasSize;
    canvasElement.height = this._canvasSize;

    body.appendChild(canvasElement);

    this.ctx = document.getElementById('grid').getContext('2d', { alpha: false });
    this.ctx.strokeStyle = 'red';
    this.ctx.font = '16px serif';

    this._drawGrid();
  }

  _drawGrid() {
    this._grid.forEach((column, ci) => {
      column.forEach((row, ri) => {
        this.ctx.strokeRect(this._cellSize * ri, this._cellSize * ci, this._cellSize, this._cellSize);
      });
    });
  }

  _drawVision(vision) {
    this.ctx.strokeStyle = 'blue';
    vision.forEach(v => {
      if (v.x >= 0 && v.y >= 0) {
        this.ctx.strokeRect(this._cellSize * v.x, this._cellSize * v.y, this._cellSize, this._cellSize);
      }
    });
    this.ctx.strokeStyle = 'red';
  }

  render({ entities, vision }) {
    if (entities?.length) {
      this.ctx.clearRect(0, 0, this._canvasSize, this._canvasSize);
      this._drawGrid();

      entities.forEach(entity => {
        this.ctx.fillText(
          entity.icon,
          (entity.position.x * this._cellSize) + (this._cellSize / 2) - 12,
          (entity.position.y * this._cellSize) + (this._cellSize / 2) + 4
        );
      });
    }

    if (vision) {
      this._drawVision(vision);
    }
  }
}
