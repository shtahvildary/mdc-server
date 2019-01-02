export default (requiredPermissions,req,res,next)=>{
    var doesntHave=[]
    if(req.user.userType>1   )
    requiredPermissions.map(p=>{
        if(req.user.permissions.findIndex(i=>i==p)==-1)return doesntHave.push(p)
    })
    if(doesntHave.length>0)return res.validSend(403,{error:"The user doesn't have permissions of this api."});
    console.log("hiiiii")
    return next();
}
