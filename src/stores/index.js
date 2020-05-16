import GridStore from '~/stores/environment/grid';
import AntStore from '~/stores/objects/ant';
import HoneyStore from '~/stores/objects/static/honey';

const gridStore = new GridStore();
const honeyStore = new HoneyStore();
const antStore = new AntStore({ staticObjects: { honeyStore } });

export default { gridStore, antStore, honeyStore };
