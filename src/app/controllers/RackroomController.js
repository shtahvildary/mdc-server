import Rackroom from '../models/Rackroom'

/*      POST /api/rackrooms/new     */
export let new_Rackroom=async(req,res)=>{
    if(!req.validate(["name"])) return;
    var {name,description}=req.body;
    try{
        var rackroom=new Rackroom({name,description});
        var savedRackroom=await rackroom.save();
        return res.validSend(200,{rackroom:savedRackroom})

    }
    catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}

/*      POST    /api/rackrooms/all      */
export let all_Rackrooms=async(req,res)=>{
    try{
        var rackroomList=await Rackroom.find({status:0});
        var data=[];
        rackroomList.map(n=>{
            data.push({
                _id:n._id,
                name:n.name,
                description:n.description,
            })
        })
        var finalResult = {
            columns: {
              name: "نام",
              description:"توضیحات",
            },
            rackroomsData:data
        }
        return res.validSend(200,{rackrooms:finalResult})
    }
    catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}

/*          POST /api/rackrooms/all/name            */
export let all_Rackrooms_Names=async(req,res)=>{
    try{
        var rackrooms= await Rackroom.find({status:0}).select({name:1}).lean();
        return res.validSend(200,{rackrooms});
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}