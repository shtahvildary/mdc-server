/**
 *          .::STREAM ROUTES::.
 * All Stream's apis are routed here.
 * 
 */
const routes=express.Router();

import  {hasChanged} from '../controllers/StreamServerController';

//ENDPOINTS
routes.post('/hasChanged',hasChanged);

export default routes;