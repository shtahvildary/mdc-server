/**
 *          .::DEVICE ROUTES::.
 * All Device's apis are routed here.
 * 
 */
const routes=express.Router();

import Auth from '../middlewares/Auth';
import checkPermissions from '../middlewares/Permissions';
import {new_NetNode,all_NetNodes,select_NetNode_byId,search_NetNodes,update_netNode,delete_netNode,recover_netNode} from '../controllers/netNodeController';

//ENDPOINTS
routes.post('/new',Auth,(req,res,next)=>{
    const requiredPermissions=[101];
    return checkPermissions(requiredPermissions,req,res,next);
},new_NetNode);
routes.post('/all',Auth,all_NetNodes);
routes.post('/search',Auth,search_NetNodes);
routes.post('/update',Auth,update_netNode);
routes.post('/delete',Auth,delete_netNode);
routes.post('/recover',Auth,recover_netNode);
routes.post('/select/one',Auth,select_NetNode_byId);

export default routes;