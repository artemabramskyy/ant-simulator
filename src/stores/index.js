import GridStore from '~/stores/environment/grid';
import AntStore from '~/stores/objects/ant';
import HoneyStore from '~/stores/objects/statick/honey';

const gridStore = new GridStore();
const honeyStore = new HoneyStore();
const antStore = new AntStore({ statickObjects: { honeyStore } });

export default { gridStore, antStore, honeyStore };
