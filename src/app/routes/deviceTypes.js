/**
 *          .::DEVICE ROUTES::.
 * All Device's apis are routed here.
 * 
 */
const routes = express.Router();

import Auth from '../middlewares/Auth';
import { newDeviceType ,allDeviceTypes} from '../controllers/DeviceTypeController'


//ENDPOINTS
routes.post('/new',Auth, newDeviceType);
routes.post('/all',Auth, allDeviceTypes);






export default routes;