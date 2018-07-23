/**
 *          .::DEVICE ROUTES::.
 * All Device's apis are routed here.
 * 
 */
const routes=express.Router();

import Auth from '../middlewares/Auth';
import {new_NetNode,all_NetNodes,search_NetNodes,update_netNode,delete_netNode,recover_netNode} from '../controllers/netNodeController';

//ENDPOINTS
routes.post('/new',Auth,new_NetNode);
routes.post('/all',Auth,all_NetNodes);
routes.post('/search',Auth,search_NetNodes);
routes.post('/update',Auth,update_netNode);
routes.post('/delete',Auth,delete_netNode);
routes.post('/recover',Auth,recover_netNode);

export default routes;