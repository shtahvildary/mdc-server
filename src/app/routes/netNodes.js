/**
 *          .::DEVICE ROUTES::.
 * All Device's apis are routed here.
 * 
 */
const routes=express.Router();

import Auth from '../middlewares/Auth';
import {newNetNode,allNetNodes} from '../controllers/netNodeController';

//ENDPOINTS
routes.post('/new',Auth,newNetNode);
routes.post('/all',allNetNodes);

export default routes;