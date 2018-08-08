/**
 *          .::DEVICE ROUTES::.
 * All Device's apis are routed here.
 * 
 */
const routes = express.Router();

import Auth from '../middlewares/Auth';
import { new_Device ,all_Devices,select_Device_byId,all_Devices_Names,delete_device} from '../controllers/DeviceController'


//ENDPOINTS
routes.post('/new',Auth, new_Device);
routes.post('/all',Auth, all_Devices);
routes.post('/all/names',Auth, all_Devices_Names);
routes.post('/select/one',Auth, select_Device_byId);
routes.post('/delete',Auth, delete_device);






export default routes;