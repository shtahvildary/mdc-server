import vlan from '../models/Vlan'

/*          POST /api/vlans/new            */
export let new_Vlan=async(req,res)=>{
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
export let all_Vlans=async(req,res)=>{
    try{
        var vlans= await vlan.find({});
        return res.validSend(200,{vlans});
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}

/*          POST /api/vlans/select/one            */
export let select_Vlan_byId = async (req, res) => {

    try {
      var vlanInfo = await vlan.findById(req.body._id) .lean();
      return res.validSend(200, { vlanInfo });
    } catch (e) {
      console.error(e);
      return res.validSend(500, { error: e });
    }
  };

/*          POST /api/vlans/all/name            */
export let all_Vlans_Names=async(req,res)=>{
    try{
        var vlans= await vlan.find({}).select({name:1}).lean();
        return res.validSend(200,{vlans});
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}