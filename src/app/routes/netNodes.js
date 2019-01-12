/**
 *          .::DEVICE ROUTES::.
 * All Device's apis are routed here.
 * 
 */
const routes=express.Router();

import Auth from '../middlewares/Auth';
import checkPermissions from '../middlewares/Permissions';
import {new_NetNode,all_NetNodes,all_NetNodes_deatails,select_NetNode_byId,search_NetNodes,update_netNode,disconnect_netNode,delete_netNode,recover_netNode,prtg_NetNodes,init_netNode} from '../controllers/netNodeController';

//ENDPOINTS
routes.post('/new',Auth,(req,res,next)=>{
    const requiredPermissions=[101];
    if (req.user.userType > 1)
    return checkPermissions(requiredPermissions,req,res,next);
    return next();
},new_NetNode);
routes.post('/all',Auth,all_NetNodes);
routes.post('/all/details',Auth,all_NetNodes_deatails);
routes.post('/search',Auth,search_NetNodes);
routes.post('/update',Auth,(req,res,next)=>{
    const requiredPermissions=[201];
    if (req.user.userType > 1)
    return checkPermissions(requiredPermissions,req,res,next);
    return next();
},update_netNode);
routes.post('/disconnect',Auth,disconnect_netNode);
routes.post('/delete',Auth,delete_netNode);
routes.post('/recover',Auth,recover_netNode);
routes.post('/select/one',Auth,select_NetNode_byId);
routes.post('/prtg',prtg_NetNodes);


routes.post('/hiNetnode',Auth,init_netNode);



export default routes;