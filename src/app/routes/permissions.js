
const routes = express.Router();
import Auth from '../middlewares/Auth';
import {all_permissions}from '../controllers/permissionsController'



routes.post("/all", Auth, all_permissions)


export default routes;

