/**
 *          .::DEVICE ROUTES::.
 * All Device's apis are routed here.
 * 
 */
const routes=express.Router();

import Auth from '../middlewares/Auth';
import {new_Location,all_Locations,select_Location_byId,all_Locations_Names,search_Locations,update_Location} from '../controllers/LocationController';

//ENDPOINTS
routes.post('/new',Auth,new_Location);
routes.post('/all',Auth,all_Locations);
routes.post('/search',Auth,search_Locations);
routes.post('/update',Auth,update_Location);
routes.post('/all/names',Auth,all_Locations_Names);
routes.post('/select/one',Auth,select_Location_byId);

export default routes;