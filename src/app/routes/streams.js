/**
 *          .::STREAM ROUTES::.
 * All Stream's apis are routed here.
 * 
 */
const routes=express.Router();

import Auth from '../middlewares/Auth';
import { new_Stream,all_Streams } from '../controllers/StreamController';

//ENDPOINTS
routes.post('/new',Auth,new_Stream);
routes.post('/all',Auth,all_Streams);

export default routes;