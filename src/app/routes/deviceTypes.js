/**
 *          .::DEVICE ROUTES::.
 * All Device's apis are routed here.
 * 
 */
const routes = express.Router();

import Auth from '../middlewares/Auth';
import { newDeviceType ,allDeviceTypes,allDeviceTypesNames} from '../controllers/DeviceTypeController'


//ENDPOINTS
routes.post('/new',Auth, newDeviceType);
routes.post('/all',Auth, allDeviceTypes);
routes.post('/all/names',Auth, allDeviceTypesNames);






export default routes;