/**
 *          .::DEVICE ROUTES::.
 * All Device's apis are routed here.
 * 
 */
const routes=express.Router();

import Auth from '../middlewares/Auth';
import {newLink,allLinks} from '../controllers/LinksController';

//ENDPOINTS
routes.post('/new',Auth,newLink);
routes.post('/all',Auth,allLinks);

export default routes;