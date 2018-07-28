import DeviceType from '../models/DeviceType'

/*          POST /api/devicetypes/new            */
export let new_DeviceType=async(req,res)=>{
    if(!req.validate(["name"]))return;
    var {name,description,specialProperties}=req.body;
    try{
        var type=new DeviceType({name,description,specialProperties});
        var savedDeviceType=await type.save();
        return res.validSend(200,{type:savedDeviceType});

    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }

}

/*          POST /api/devicetypes/all            */
export let all_DeviceTypes=async(req,res)=>{
    try{
        var typeList= await DeviceType.find({status:0});
        var data=[];
        typeList.map(n=>{
            data.push({
                _id:n._id,
                name:n.name,
                description:n.description,
                // specialProperties:n.specialProperties,
            })
            var property=[];
            n.specialProperties.map(p=>{
                property.push({
                    en:p.en,
                    fa:p.fa,
                })
            })
            data.push({specialProperties:property})
        })
        var finalResult={
            columns:{
                name:"نام",
                description:"توضیحات",
                specialProperties:"ویژگی ها",
            },
            typesData:data,
        }
        console.log(typeList)
        return res.validSend(200,{types:finalResult});
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}

/*          POST /api/devicetypes/all/name            */
export let all_DeviceTypes_Names=async(req,res)=>{
    try{
        var deviceTypes= await DeviceType.find({status:0}).select({name:1,specialProperties:1}).lean();
        return res.validSend(200,{deviceTypes});
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}
