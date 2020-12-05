export default {
  app: {
    tickRate: 100,
    grid: {
      cells: 50,
      size: 800
    },
    objects: {
      ant: {
        color: 'red',
        velocity: 1, // TODO: only 1 is supported
        visionRadius: 5,
        position: { x: 0, y: 0 },
        bag: [],
        icon: '🐜'
      },
      static: {
        honey: {
          position: { x: 9, y: 7 },
          type: 'honey',
          icon: '🍯',
          onGrid: true
        }
      }
    }
  },
  env: { state: 'dev' }
};
