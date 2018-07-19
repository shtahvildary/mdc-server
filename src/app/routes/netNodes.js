/**
 *          .::DEVICE ROUTES::.
 * All Device's apis are routed here.
 * 
 */
const routes=express.Router();

import Auth from '../middlewares/Auth';
import {new_NetNode,all_NetNodes,search_NetNodes} from '../controllers/netNodeController';

//ENDPOINTS
routes.post('/new',Auth,new_NetNode);
routes.post('/all',Auth,all_NetNodes);
routes.post('/search',Auth,search_NetNodes);

export default routes;