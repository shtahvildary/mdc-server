import Device from '../models/Device'

/*          POST /api/devices/new            */
export let newDevice=async(req,res)=>{
    if(!req.validate(["name","model"]))return;
    var {name,ip,description,deviceType,model,vlan,location,managementUrl,password,channel}=req.body;
    try{
        var dev=new Device({name,ip,description,deviceType,model,vlan,location,managementUrl,password,channel});
        var savedDevice=await dev.save();
        return res.validSend(200,{device:savedDevice});

    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }

}

/*          POST /api/devices/all            */
export let allDevices=async(req,res)=>{
    try{
        var devList= await Device.find({},{name:1});
        return res.validSend(200,{devices:devList});
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}
