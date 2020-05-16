export default {
  app: {
    tickRate: 500,
    grid: {
      size: {
        width: 100,
        height: 70
      }
    },
    objects: {
      ant: {
        color: 'red',
        velocity: 1, // TODO: only 1 is supported
        visionRadius: 5,
        position: { x: 0, y: 0 }
      },
      static: {
        honey: {
          position: { x: 9, y: 7 },
          type: 'honey',
          icon: '🍯'
        }
      }
    }
  },
  env: { state: '' }
};
