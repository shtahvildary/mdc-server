/**
 *          .::DEVICE ROUTES::.
 * All Device's apis are routed here.
 * 
 */
const routes=express.Router();

import Auth from '../middlewares/Auth';
import {new_Rackroom,all_Rackrooms,all_Rackrooms_Names} from '../controllers/RackroomController';

//ENDPOINTS
routes.post('/new',Auth,new_Rackroom);
routes.post('/all',Auth,all_Rackrooms);
routes.post('/all/names',Auth,all_Rackrooms_Names);

export default routes;