
/*          POST /api/streamServer/hasChanged            */


export let hasChanged=async(req,res)=>{

    io.emit("changes",req.body)
    return res.validSend(200,{message:"changes have been sent to clients."})
}