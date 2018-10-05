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
import rackrooms from './rackrooms';
import netNodes from './netNodes';
import vlans from './vlans';
import deviceTypes from './deviceTypes';
import departments from './departments';
import streams from './streams';
import streamServer from './streamServer' 


//USING ROUTES
routes.use('/users', users);
routes.use('/switches', switches);
routes.use('/devices',devices);
routes.use('/locations',locations);
routes.use('/rackrooms',rackrooms);
routes.use('/netnodes',netNodes);
routes.use('/vlans',vlans);
routes.use('/devicetypes',deviceTypes);
routes.use('/departments',departments);
routes.use('/streams',streams);
routes.use('/streamServer',streamServer);

export default routes;