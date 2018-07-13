/**
 *          .::DEVICE ROUTES::.
 * All Device's apis are routed here.
 * 
 */
const routes=express.Router();

import Auth from '../middlewares/Auth';
import {newLocation,allLocations,allLocationsNames} from '../controllers/LocationController';

//ENDPOINTS
routes.post('/new',Auth,newLocation);
routes.post('/all',Auth,allLocations);
routes.post('/all/names',Auth,allLocationsNames);

export default routes;