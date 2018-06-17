/**
 *          .::DEVICE ROUTES::.
 * All Device's apis are routed here.
 * 
 */
const routes=express.Router();

import Auth from '../middlewares/Auth';
import {newLocation,allLocations} from '../controllers/LocationController';

//ENDPOINTS
routes.post('/new',Auth,newLocation);
routes.post('/all',allLocations);

export default routes;