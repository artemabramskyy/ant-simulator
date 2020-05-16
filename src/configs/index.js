export default {
  app: {
    tickRate: 500,
    grid: {
      size: {
        width: 10,
        height: 10
      }
    },
    objects: {
      ant: {
        color: 'red',
        velocity: 1, // TODO: only 1 is supported
        visionRadius: 2,
        position: { x: 0, y: 0 }
      },
      static: {
        honey: {
          position: { x: 4, y: 4 },
          type: 'honey',
          icon: '🍯'
        }
      }
    }
  },
  env: { state: 'dev' }
};
