/**
 *          .::DEVICE ROUTES::.
 * All Device's apis are routed here.
 * 
 */
const routes=express.Router();

import Auth from '../middlewares/Auth';
import {new_Department,all_Departments,all_Departments_Names} from '../controllers/DepartmentController';

//ENDPOINTS
routes.post('/new',Auth,(req,res,next)=>{
    const requiredPermissions=[108];
    return checkPermissions(requiredPermissions,req,res,next);
},new_Department);
routes.post('/all',Auth,all_Departments);
routes.post('/all/names',Auth,all_Departments_Names);

export default routes;