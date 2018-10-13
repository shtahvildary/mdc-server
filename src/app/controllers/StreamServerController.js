
/*          POST /api/streamServer/hasChanged            */


export let hasChanged=async(req,res)=>{
try{

     io.emit("changes",req.body)
    console.plain(req.body)
    return res.validSend(200,{message:"changes have been sent to clients."})
}
catch(e){

    return res.validSend(500,{error:e})
}
}