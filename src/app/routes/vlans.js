/**
 *          .::DEVICE ROUTES::.
 * All Device's apis are routed here.
 * 
 */
const routes=express.Router();

import Auth from '../middlewares/Auth';
import {newVlan,allVlans,allVlansNames} from '../controllers/vlanController';

//ENDPOINTS
routes.post('/new',Auth,newVlan);
routes.post('/all',Auth,allVlans);
routes.post('/all/names',Auth,allVlansNames);

export default routes;