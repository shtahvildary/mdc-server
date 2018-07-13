/**
 *          .::SWITCH ROUTES::.
 * All Switch's apis are routed here.
 * 
 */
const routes = express.Router();

import Auth from '../middlewares/Auth';
import { newSwitch ,allSwitches,allSwitchesNames} from '../controllers/SwitchesController'


//ENDPOINTS
routes.post('/new',Auth, newSwitch);
routes.post('/all',Auth, allSwitches);
routes.post('/all/names',Auth, allSwitchesNames);






export default routes;