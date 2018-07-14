/**
 *          .::ROUTES::.
 * All routes are imported here.
 * 
 */
const routes = express.Router();
import users from './users';
import switches from './switches';
import devices from './devices';
import locations from './locations';
import netNodes from './netNodes';
import vlans from './vlans';
import deviceTypes from './deviceTypes';

//USING ROUTES
routes.use('/users', users);
routes.use('/switches', switches);
routes.use('/devices',devices);
routes.use('/locations',locations);
routes.use('/netnodes',netNodes);
routes.use('/vlans',vlans);
routes.use('/devicetypes',deviceTypes);

export default routes;