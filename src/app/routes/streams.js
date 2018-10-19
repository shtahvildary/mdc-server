/**
 *          .::STREAM ROUTES::.
 * All Stream's apis are routed here.
 * 
 */
const routes=express.Router();

import Auth from '../middlewares/Auth';
import { new_Stream,all_Streams,all_Streams_client ,update_Stream,delete_Stream,search_Streams} from '../controllers/StreamController';

//ENDPOINTS
routes.post('/new',Auth,new_Stream);
routes.post('/all',Auth,all_Streams);
routes.post('/client/all',all_Streams_client);
routes.post('/update',Auth,update_Stream);
routes.post('/delete',Auth,delete_Stream);
routes.post('/search',Auth,search_Streams);


export default routes;