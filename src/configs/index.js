export default {
  app: {
    tickRate: 100,
    grid: {
      cells: 30,
      size: 900
    },
    objects: {
      ant: {
        color: 'red',
        velocity: 1, // TODO: only 1 is supported
        visionRadius: 5,
        position: { x: 1, y: 1 },
        bag: [],
        icon: '🐜'
      },
      static: {
        honey: {
          position: { x: 9, y: 7 },
          type: 'honey',
          icon: '🍯',
          onGrid: true
        },
        base: {
          position: { x: 0, y: 0 },
          type: 'base',
          icon: '🌰',
          onGrid: true,
          storage: []
        }
      }
    }
  },
  env: { state: 'dev' }
};
