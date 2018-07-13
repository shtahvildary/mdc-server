import vlan from '../models/Vlan'

/*          POST /api/vlans/new            */
export let newVlan=async(req,res)=>{
    if(!req.validate(["number"]))return;
    var {number,name,ip,description,firstIp,lastIp,subnetMask}=req.body;
    try{
        var virtualLan=new vlan({number,name,ip,description,firstIp,lastIp,subnetMask});
        var VLAN=await virtualLan.save();
        return res.validSend(200,{vlan:VLAN});

    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }

}

/*          POST /api/vlans/all            */
export let allVlans=async(req,res)=>{
    try{
        var vlans= await vlan.find({});
        return res.validSend(200,{vlans});
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}



/*          POST /api/vlans/all/name            */
export let allVlansNames=async(req,res)=>{
    try{
        var vlans= await vlan.find({}).select({name:1}).lean();
        return res.validSend(200,{vlans});
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}