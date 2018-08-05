/**
 *          .::USER ROUTES::.
 * All User's apis are routed here.
 * 
 */
const routes = express.Router();

import Auth from '../middlewares/Auth';
import {
	register,
	login,
	me,
	update_me,
	update_others
} from '../controllers/UsersController'

//ENDPOINTS
routes.post('/register', register);
routes.post('/login', login);
routes.post('/me', Auth, me);
routes.post('/me/update', Auth, update_me);
routes.post('/others/update', Auth, update_others);




export default routes;