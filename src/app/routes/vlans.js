/**
 *          .::DEVICE ROUTES::.
 * All Device's apis are routed here.
 * 
 */
const routes=express.Router();

import Auth from '../middlewares/Auth';
import {new_Vlan,all_Vlans,select_Vlan_byId,all_Vlans_Names,search_Vlans,update_Vlan,delete_vlan} from '../controllers/vlanController';

//ENDPOINTS
routes.post('/new',Auth,new_Vlan);
routes.post('/all',Auth,all_Vlans);
routes.post('/all/names',Auth,all_Vlans_Names);
routes.post('/search',Auth,search_Vlans);
routes.post('/update',Auth,update_Vlan);
routes.post('/select/one',Auth,select_Vlan_byId);
routes.post('/delete',Auth,delete_vlan);

export default routes;