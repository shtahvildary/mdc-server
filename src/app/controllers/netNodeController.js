import NetNode from '../models/NetNode'

/*          POST /api/netnodes/new            */
export let newNetNode=async(req,res)=>{
    if(!req.validate(["patchPanelPort"]))return;
    var {patchPanelPort,cabelNumber,switchId,switchPort,vlan,device,location,description,location}=req.body;
    try{
        var nNode=new NetNode({patchPanelPort,cabelNumber,switchId,switchPort,vlan,device,location,description,location});
        var netNode=await nNode.save();
        return res.validSend(200,{netNode});

    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }

}

/*          POST /api/netnodes/all            */
export let allNetNodes=async(req,res)=>{
    try{
        var netNodes= await NetNode.find({});
        return res.validSend(200,{netNodes});
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}
