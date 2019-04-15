/**
 *          .::SWITCH ROUTES::.
 * All Switch's apis are routed here.
 * 
 */
const routes = express.Router();

import Auth from '../middlewares/Auth';
import { new_Switch, all_Switches,summary_Switches, all_SwitchesNames, search_Switches, update_Switch, select_Switche_byId, delete_switch } from '../controllers/SwitchesController'

//ENDPOINTS
routes.post('/new', Auth,
    (req, res, next) => {
        if (req.user.userType > 1)
            return checkPermissions([102], req, res, next);
        return next()
    },
    new_Switch);
routes.post('/all', Auth, all_Switches);
routes.post('/summary', Auth, summary_Switches);
routes.post('/all/names', Auth, all_SwitchesNames);
routes.post('/search', Auth, search_Switches);
routes.post('/update', Auth,
    (req, res, next) => {
        if (req.user.userType > 1)
            return checkPermissions([202], req, res, next);
        return next()
    },
    update_Switch);
routes.post('/select/one', Auth, select_Switche_byId);
routes.post('/delete', Auth, delete_switch);

export default routes;