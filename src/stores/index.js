import GridStore from '~/stores/environment/grid';
import AntStore from '~/stores/objects/ant';
import HoneyStore from '~/stores/objects/honey';

const gridStore = new GridStore();
const antStore = new AntStore();
const honeyStore = new HoneyStore();

export default { gridStore, antStore, honeyStore };
