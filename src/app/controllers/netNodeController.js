import NetNode from '../models/NetNode'
import Location from '../models/Location'

/*          POST /api/netnodes/new            */
export let new_NetNode = async (req, res) => {
    if (!req.validate(["patchPanelPort"])) return;
    var { patchPanelPort, cableNumber, switchId, switchPort, vlan, device, description, location } = req.body;
    try {
        var nNode = new NetNode({ patchPanelPort, cableNumber, switchId, switchPort, vlan, device, description, location });
        var netNode = await nNode.save();
        return res.validSend(200, { netNode });

    } catch (e) {
        console.error(e);
        return res.validSend(500, { error: e });
    } 

}

/*          POST /api/netnodes/all            */
export let all_NetNodes = async (req, res) => {
    try {
        var netNodes = await NetNode.find({status:0}).
            populate({ path: "switchId", select:[ "name","_id"] })
            .populate({ path: "vlan", select: ["name","_id" ]})
            .populate({ path: "device", select: [ "name","_id"]})
            .populate({ path: "location", select: [ "name","_id"] })
            // .populate({ path: "rackroom", select: [ "name","_id"] });
        // console.plain(netNodes)
        var data = []
        netNodes.map(n => {
            console.plain("n: ", n)
            var vlan,device,location="";
            if(n.vlan)vlan=n.vlan
            if(n.device)device=n.device
            if(n.location)vlan=n.location
            data.push({
                _id: n._id,
                patchPanelPort: n.patchPanelPort,
                cableNumber: n.cableNumber,
                switchName: n.switchId.name,
                switchPort: n.switchPort,
                vlanName: vlan.name,
                deviceName: device.name,
                descriptionName: n.description,
                locationName: location.name,
                // rackroomName: n.rackroom.name,

                switchId:n.switchId._id,
                vlanId:vlan._id,
                deviceId:device._id,
                locationId:location._id,
                // rackroomId:n.rackroom._id,
            })
            

        })

        var finalResult = {
            columns: {
                patchPanelPort: "شماره patch panel",
                cableNumber: "شماره کابل",
                switchName: "سوییچ",
                switchPort: "شماره پورت سوییچ",
                vlanName: "شبکه مجازی",
                deviceName: "نوع",
                description: "توضیحات",
                locationName: "مکان",
                // rackroomName:"رک روم",
            },
            netNodesData: data
        }
        return res.validSend(200, { netNodes: finalResult });
    } catch (e) {
        console.error(e);
        return res.validSend(500, { error: e });
    }
}
/*          POST /api/netNodes/select/one            */
export let select_NetNode_byId = async (req, res) => {

    try {
      var netNodeInfo = await NetNode.findById(req.body._id) 
      .populate({ path: "switchId", select:[ "name","_id"] })
      .populate({ path: "vlan", select: ["name","_id" ]})
      .populate({ path: "device", select: [ "name","_id"]})
      .populate({ path: "location", select: [ "name","_id"] })
        .lean();
      return res.validSend(200, { netNodeInfo });
    } catch (e) {
      console.error(e);
      return res.validSend(500, { error: e });
    }
  };

/*          POST /api/netnodes/search            */
export let search_NetNodes = async (req, res) => {
    try {
        var { search } = req.body;
        if (!search) search = "";
        var dbQuery = {
            $or: [
                {
                    "patchPanelPort":
                    {
                        $regex: search,
                        $options: 'i'
                    }
                }, {
                    "cableNumber": {
                        $regex: search,
                        $options: 'i'
                    },
                }, {
                    // switch: {$regex: search,
                    //     $options: 'i'},
                    "switchPort": {
                        $regex: search,
                        $options: 'i'
                    },
                }, {
                    // vlan:{$regex: search,
                    //     $options: 'i'},
                    // device:{$regex: search,
                    //     $options: 'i'},
                    "description": {
                        $regex: search,
                        $options: 'i'
                    },
                },
                

            ]
        }
        
        var finalQuery={$and:[dbQuery,{status:0}]}
        var locations=await Location.find({name:{$regex:search,$options:'i'}}).lean();
        console.log("locs",locations)
        locations=locations.map(l=>l._id)
        if(locations.length>0)dbQuery["$or"].push({location:{$in:locations}})
        // var netNodes = await NetNode.find(dbQuery, { _id: 0 }).
        var netNodes = await NetNode.find(finalQuery, { _id: 0 }).
            populate({ path: "switchId", select:[ "name","_id"] })
            .populate({ path: "vlan", select: [ "name","_id"] })
            .populate({ path: "device", select: [ "name","_id"] })
            .populate({ path: "location", select: [ "name","_id"] })
            // .populate({ path: "rackroom", select: [ "name","_id"] });
        // console.plain(netNodes)
        var data = []
        netNodes.map(n => {
            
            data.push({
                _id: n._id,
                patchPanelPort: n.patchPanelPort,
                cableNumber: n.cableNumber,
                switchName: n.switchId.name,
                switchPort: n.switchPort,
                vlanName: n.vlan.name,
                deviceName: n.device.name,
                descriptionName: n.description,
                locationName: n.location.name,
                // rackroomName: n.rackroom.name,

                switchId:n.switchId._id,
                vlanId:n.vlan._id,
                deviceId:n.device._id,
                locationId:n.location._id,
                // rackroomId:n.rackroom._id,
            })

        })

        var finalResult = {
            columns: {
                patchPanelPort: "شماره patch panel",
                cableNumber: "شماره کابل",
                switchName: "سوییچ",
                switchPort: "شماره پورت سوییچ",
                vlanName: "شبکه مجازی",
                deviceName: "نوع",
                description: "توضیحات",
                locationName: "مکان",
                // rackroomName:"رک روم",
            },
            netNodesData: data
        }
        return res.validSend(200, { netNodes: finalResult });

    }
    catch (e) {
        console.error(e);
        return res.validSend(500, { error: e });
    }
}


/*          POST /api/netnodes/update            */

export let update_netNode=async(req,res)=>{
    // router.post("/update", auth, upload.single('logo'),function(req, res) {
        if(!req.validate(["_id"]))return;
    var { _id,patchPanelPort, cableNumber, switchId, switchPort, vlan, device, description, location } = req.body;
        
        var query={patchPanelPort, cableNumber, switchId, switchPort, vlan, device, description, location}
        try{
            await NetNode.update({_id},query)
            return res.validSend(200,{message:"Update is successful"});
    
        }catch(e){
            console.error(e);
            return res.validSend(500,{error:e});
        }
    }


/*          POST /api/netnodes/delete            */

// {"arrayOfIds":["5b554f952e3eb30b1890d638"]}

export let delete_netNode=async(req,res)=>{
        if(!req.validate(["arrayOfIds"]))return;
    var { arrayOfIds } = req.body;
                
        try{
            await NetNode.update({_id:{ $in : arrayOfIds }},{status:1})
            return res.validSend(200,{message:"delete is successful"});
    
        }catch(e){
            console.error(e);
            return res.validSend(500,{error:e});
        }
    }
/*          POST /api/netnodes/recover            */

    export let recover_netNode=async(req,res)=>{
        if(!req.validate(["arrayOfIds"]))return;
    var { arrayOfIds } = req.body;
                
        try{
            await NetNode.update({_id:{ $in : arrayOfIds }},{status:0})
            return res.validSend(200,{message:"recovery progress is successful"});
    
        }catch(e){
            console.error(e);
            return res.validSend(500,{error:e});
        }
    }
 

