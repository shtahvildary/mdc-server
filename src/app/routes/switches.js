/**
 *          .::SWITCH ROUTES::.
 * All Switch's apis are routed here.
 * 
 */
const routes = express.Router();

import Auth from '../middlewares/Auth';
import { new_Switch ,all_Switches,all_SwitchesNames,search_Switches,update_Switch} from '../controllers/SwitchesController'


//ENDPOINTS
routes.post('/new',Auth, new_Switch);
routes.post('/all',Auth, all_Switches);
routes.post('/all/names',Auth, all_SwitchesNames);
routes.post('/search',Auth, search_Switches);
routes.post('/update',Auth, update_Switch);






export default routes;