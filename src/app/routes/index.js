/**
 *          .::ROUTES::.
 * All routes are imported here.
 * 
 */
const routes = express.Router();
import users from './users';
import switches from './switches';

//USING ROUTES
routes.use('/users', users);
routes.use('/switches', switches);

export default routes;