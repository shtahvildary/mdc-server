/**
 *          .::DEVICE ROUTES::.
 * All Device's apis are routed here.
 * 
 */
const routes=express.Router();

import Auth from '../middlewares/Auth';
import {new_Location,all_Locations,select_Location_byId,all_Locations_Names,search_Locations,update_Location,delete_location} from '../controllers/LocationController';

//ENDPOINTS
routes.post('/new',Auth,(req,res,next)=>{
    const requiredPermissions=[103];
    return checkPermissions(requiredPermissions,req,res,next);
},new_Location);
routes.post('/all',Auth,all_Locations);
routes.post('/search',Auth,search_Locations);
routes.post('/update',Auth,(req,res,next)=>{
    const requiredPermissions=[203];
    return checkPermissions(requiredPermissions,req,res,next);
},update_Location);
routes.post('/all/names',Auth,all_Locations_Names);
routes.post('/select/one',Auth,select_Location_byId);
routes.post('/delete',Auth,delete_location);

export default routes;