import DeviceType from '../models/DeviceType'

/*          POST /api/devicetypes/new            */
export let newDeviceType=async(req,res)=>{
    if(!req.validate(["type"]))return;
    var {type,description}=req.body;
    try{
        var type=new DeviceType({type,description});
        var savedDeviceType=await dev.save();
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
