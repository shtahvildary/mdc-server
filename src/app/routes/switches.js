/**
 *          .::SWITCH ROUTES::.
 * All Switch's apis are routed here.
 * 
 */
const routes = express.Router();

import Auth from '../middlewares/Auth';
import { new_Switch ,all_Switches,all_SwitchesNames,search_Switches,update_Switch,select_Switche_byId,delete_switch} from '../controllers/SwitchesController'

//ENDPOINTS
routes.post('/new',Auth,
// (req,res,next)=>{
//     console.log("req.user.userType: ",req.user.userType)
//     const requiredPermissions=[102];
//     if(req.user.userType>1)
//     return checkPermissions(requiredPermissions,req,res,next);
// },
 new_Switch);
routes.post('/all',Auth, all_Switches);
routes.post('/all/names',Auth, all_SwitchesNames);
routes.post('/search',Auth, search_Switches);
routes.post('/update',Auth,
// (req,res,next)=>{
//     const requiredPermissions=[202];
//     return checkPermissions(requiredPermissions,req,res,next);
// },
 update_Switch);
routes.post('/select/one',Auth, select_Switche_byId);
routes.post('/delete',Auth, delete_switch);

export default routes;