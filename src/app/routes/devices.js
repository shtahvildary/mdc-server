/**
 *          .::DEVICE ROUTES::.
 * All Device's apis are routed here.
 * 
 */
const routes = express.Router();

import Auth from '../middlewares/Auth';
import { newDevice ,allDevices,allDevicesNames} from '../controllers/DeviceController'


//ENDPOINTS
routes.post('/new',Auth, newDevice);
routes.post('/all',Auth, allDevices);
routes.post('/all/names',Auth, allDevicesNames);






export default routes;