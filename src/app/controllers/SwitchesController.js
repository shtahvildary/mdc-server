import Switch from '../models/Switch'

/*          POST /api/switches/new            */
export let newSwitch=async(req,res)=>{
    if(!req.validate(["name","model"]))return;
    var {name,ip,description,model}=req.body;
    try{
        var sw=new Switch({name,ip,description,model});
        var savedSW=await sw.save();
        return res.validSend(200,{switch:savedSW});

    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }

}

/*          POST /api/switches/all            */
export let allSwitches=async(req,res)=>{
    try{
        var swList= await Switch.find({});
        return res.validSend(200,{switches:swList});
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}
