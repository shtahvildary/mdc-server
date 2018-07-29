/**
 *          .::DEVICE ROUTES::.
 * All Device's apis are routed here.
 * 
 */
const routes=express.Router();

import Auth from '../middlewares/Auth';
import {new_Location,all_Locations,search_Locations,update_Location} from '../controllers/LocationController';

//ENDPOINTS
routes.post('/new',Auth,new_Location);
routes.post('/all',Auth,all_Locations);
routes.post('/all',Auth,search_Locations);
routes.post('/all',Auth,update_Location);
// routes.post('/all/names',Auth,allLocationsNames);

export default routes;