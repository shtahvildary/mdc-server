import DeviceType from '../models/DeviceType'

/*          POST /api/devicetypes/new            */
export let newDeviceType=async(req,res)=>{
    if(!req.validate(["name"]))return;
    var {name,description}=req.body;
    try{
        var type=new DeviceType({name,description});
        var savedDeviceType=await type.save();
        return res.validSend(200,{type:savedDeviceType});

    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }

}

/*          POST /api/devicetypes/all            */
export let allDeviceTypes=async(req,res)=>{
    try{
        var typeList= await DeviceType.find({});
        return res.validSend(200,{types:typeList});
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}

/*          POST /api/devicetypes/all/name            */
export let allDeviceTypesNames=async(req,res)=>{
    try{
        var deviceTypes= await DeviceType.find({}).select({name:1}).lean();
        return res.validSend(200,{deviceTypes});
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}
