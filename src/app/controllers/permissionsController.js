const fs = require("fs");
var path=require("path")

/*      POST    /api/permissions/all      */

export let all_permissions=async(req,res)=>{
    var jsonPath=path.join(__dirname,'../middlewares/permissions.json')
//read json
  let rawdata = fs.readFileSync(jsonPath);
  let permissionsList = JSON.parse(rawdata);
  
return res.validSend(200,permissionsList)
}