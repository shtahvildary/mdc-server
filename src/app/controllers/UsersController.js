/**
 *          .::USER CONTROLLER::.
 * All related operations to User belong here. 
 * 
 */
import User from '../models/User';
import tokenize from '../middlewares/Token'
  


/*          POST /api/users/register            */
/* example:
{"username" : "admin",
    "password" : "admin",
	"fName":"admin",
	"lName":"admin",
	"userType":0
}
*/
export let register = async(req, res, next) => {
    //REQUEST VALIDATION
    if (!req.validate(["username", "password"])) return;

    var {
        fName,
        lName,
        username,
        password,
        userType,
        permissions,
    } = req.body;
    console.plain("user permissions: ",req.body)
    //CHECK IF USER ALREADY EXISTS
    if(await User.findOne({username})) return res.validSend(409,{error:"username already exists."});
    //CREATING NEW USER OBJECT
    var newUser = new User({
        fName,
        lName,
        username,
        password,
        userType,
        permissions,
    });
    try {
        //SAVING USER
        var savedUser = await newUser.save();
        //GENERATING TOKEN
        var token = await tokenize(savedUser._id);

        //OK RESPONSE
        res.validSend(200, {
            registered: true,
            message: "User has been registered successfully.",
            token: token
        });
    } catch (e) {
        //FAILURE RESPONSE
        res.validSend(500, {
            error: JSON.stringify(e)
        });
    }

}
/*          POST /api/users/login            */
export let login = async(req, res, next) => {
    //REQUEST VALIDATION    
    if (!req.validate(["username", "password"])) return;

    var {
        username,
        password
    } = req.body;
    try {
        //FINDING USER
        var user = await User.findOne({
            username
        });
        //AUTHENTICATING USER
        var authenticated = await User.authorize({
            _id: user._id,
            password
        });

        //GENERATING TOKEN
        if (authenticated)
            var token = await tokenize(user._id);

        //OK RESPONSE
        res.validSend(200, {
            authenticated,
            token
        })
    } catch (e) {
        //FAILURE RESPONSE
        res.validSend(500, {
            error: JSON.stringify(e)
        })
    }
}
/*          POST /api/users/me            */
export let me = async(req, res) => {
    //OK RESPONSE 
    res.validSend(200, req.user);
}

export let update_me=async(req,res)=>{
    if (!req.validate(["username", "password"])) return;

    var _id=req.user
    var{fName,lName,password}=req.body
    var query={fName,lName,password}
    try{
        await User.update({_id},query);
        return res.validSend(200,{ message: "Update is successful" });
    } catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}

export let update_others=async(req,res)=>{
    if (!req.validate(["_id"])) return;
    var{_id,fName,lName,password,userType,permissions}=req.body
    var query={fName,lName,password,userType,permissions}
    try{
        await User.update({_id},query);
        return res.validSend(200,{ message: "Update is successful" });
    } catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}

export let all_Users=async(req,res)=>{
    try{
        
        var users=await User.find({$and:[{status:0},{userType:{$gte:1}}]});
        var data=[];
        var userType;
        users.map(n=>{
            switch (n.userType){
                case 1: userType="گروه مدیران"; break;
                case 2: userType="گروه کاربران"; break;
            }
            data.push({
                _id:n._id,
                fName:n.fName,
                lName:n.lName,
                // userType:n.userType,
                userType:userType,
                permissions:n.permissions

            })
            var finalResult={
                columns:{
                    fName:'نام',
                    lName:'نام خانوادگی',
                    userType:'گروه کاربری',
                },usersData:data,
            }
            return res.validSend(200,{users:finalResult})
        })
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}