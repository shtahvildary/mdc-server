import Device from '../models/Device'

/*          POST /api/devices/new            */
export let new_Device=async(req,res)=>{
    if(!req.validate(["name","deviceType"]))return;
    var {name,ip,description,deviceType,model,code,specialProperties,department}=req.body;
    try{
        var dev=new Device({name,ip,description,deviceType,model,code,specialProperties,department});
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
        var devList= await Device.find({status:0}).lean()
        .populate({path:"deviceType",select:["name","_id"]})
        .populate({path:"department",select:["name","_id"]});
        var data=[];
        devList.map(n=>{
            
            // ////////////////////////////
            // //for speCialProperties:
            // var property=[];
            // console.plain("n.specialProperties: ",n)
            // n.specialProperties.map(p=>{
            //     property.push({
            //         name:p.name,
            //         value:p.value,
            //     })
            // })
            // ////////////////////////////

            data.push({
                _id:n._id,
                name:n.name,
                ip:n.ip,
                description:n.description,
                deviceTypeName:n.deviceType.name,
                model:n.model,
                code:n.code,
                departmentName:n.department.name,

                deviceTypeId:n.deviceType._id,
                departmentId:n.department._id,
                // specialProperties:property,
            })
           
            // data.push({specialProperties:property})
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
                // specialProperties:"سایر ویژگیها",
            },
            devicesData:data
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
        console.plain(req.body._id)
      var deviceInfo = await Device.findById(req.body._id).populate({path:"deviceType",select:"name"}) .lean();
      if(res.deviceInfo.status===0)
      return res.validSend(200, { deviceInfo });
      else return res.validSend(500, { error: "nothing to return..." });
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

  /*          POST /api/devices/delete            */
// {"arrayOfIds":["5b554f952e3eb30b1890d638"]}

export let delete_device=async(req,res)=>{
    if(!req.validate(["arrayOfIds"]))return;
var { arrayOfIds } = req.body;
            
    try{
        await Device.update({_id:{ $in : arrayOfIds }},{status:1},{ multi: true})
        return res.validSend(200,{message:"delete is successful"});

    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}
