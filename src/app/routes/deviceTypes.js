/**
 *          .::DEVICE ROUTES::.
 * All Device's apis are routed here.
 * 
 */
const routes = express.Router();

import Auth from '../middlewares/Auth';
import { new_DeviceType ,all_DeviceTypes,all_DeviceTypes_Names} from '../controllers/DeviceTypeController'


//ENDPOINTS
routes.post('/new',Auth,(req,res,next)=>{
    const requiredPermissions=[107];
    return checkPermissions(requiredPermissions,req,res,next);
}, new_DeviceType);
routes.post('/all',Auth, all_DeviceTypes);
routes.post('/all/names',Auth, all_DeviceTypes_Names);

export default routes;