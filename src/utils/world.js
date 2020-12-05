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

    this.ctx = document.getElementById('grid').getContext('2d');
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

  render(entities) {
    if (entities.length) {
      this.ctx.clearRect(0, 0, this._canvasSize, this._canvasSize);
      this._drawGrid();

      entities.forEach(entity => {
        this.ctx.fillText(entity.icon, entity.position.x * this._cellSize, entity.position.y * this._cellSize);
      });
    } else {
      throw new Error('Nothing to render!');
    }
  }
}
