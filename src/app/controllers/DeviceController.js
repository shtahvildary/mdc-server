import Device from '../models/Device'

/*          POST /api/devices/new            */
export let new_Device=async(req,res)=>{
    if(!req.validate(["name","deviceType"]))return;
    var {name,ip,description,deviceType,model,code,managementUrl,specialProperties,department}=req.body;
    try{
        var dev=new Device({name,ip,description,deviceType,model,code,managementUrl,specialProperties,department});
        var savedDevice=await dev.save();
        return res.validSend(200,{device:savedDevice});

    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }

}

/*          POST /api/devices/all            */
export let all_Devices=async(req,res)=>{
    try{
        var devList= await Device.find({status:0},{name:1})
        .populate({path:"deviceType",select:["name","_id"]})
        .populate({path:"department",select:["name","_id"]});
        var data=[];
        devList.map(n=>{
            data.push({
                _id:n._id,
                name:n.name,
                ip:n.ip,
                description:n.description,
                deviceTypeName:n.deviceType.name,
                model:n.model,
                code:n.code,
                managementUrl:n.managementUrl,
                departmentName:n.department.name,

                deviceTypeId:n.deviceType._id,
                departmentId:n.department._id,
            })
            var property=[];
            n.specialProperties.map(p=>{
                property.push({
                    name:p.name,
                    value:p.value,
                })
            })
            data.push({specialProperties:property})
        })
        var finalResult={
            columns:{
                name:"نام",
                ip:"آی پی",
                description:"توضیحات",
                deviceTypeName:"نوع",
                model:"مدل",
                code:"شماره اموال",
                department:"واحد",
                specialProperties:"سایر ویژگیها",
            },
            deviceData:data
        }

        return res.validSend(200,{devices:finalResult});
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}

/*      POST    /api/devices/select/one      */
export let select_Device_byId = async (req, res) => {
    try {
      var deviceInfo = await Device.findById(req.body._id).populate({path:"deviceType",select:"name"}) .lean();
      return res.validSend(200, { deviceInfo });
    } catch (e) {
      console.error(e);
      return res.validSend(500, { error: e });
    }
  };

/*          POST /api/devices/all/name            */
export let all_Devices_Names=async(req,res)=>{
    try{
        var devices= await Device.find({status:0}).select({name:1}).lean();
        return res.validSend(200,{devices});
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}
