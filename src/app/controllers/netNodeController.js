import NetNode from '../models/NetNode'

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
        var netNodes = await NetNode.find({}).
            populate({ path: "switchId", select:[ "name","_id"] })
            .populate({ path: "vlan", select: ["name","_id" ]})
            .populate({ path: "device", select: [ "name","_id"]})
            .populate({ path: "location", select: [ "name","_id"] });
        // console.plain(netNodes)
        var data = []
        netNodes.map(n => {
            console.plain("n: ", n)
            data.push({
                _id: n._id,
                patchPanelPort: n.patchPanelPort,
                cableNumber: n.cableNumber,
                switchName: n.switchId.name,
                switchPort: n.switchPort,
                vlan: n.vlan.name,
                device: n.device.name,
                description: n.description,
                location: n.location.name,

                switchId:n.switchId._id,
                vlanId:n.vlan._id,
                deviceId:n.device._id,
                locationId:n.location._id,
            })

        })

        var finalResult = {
            columns: {
                patchPanelPort: "شماره patch panel",
                cableNumber: "شماره کابل",
                switchName: "سوییچ",
                switchPort: "شماره پورت سوییچ",
                vlan: "شبکه مجازی",
                device: "نوع",
                description: "توضیحات",
                location: "مکان",
            },
            netNodesData: data
        }
        return res.validSend(200, { netNodes: finalResult });
    } catch (e) {
        console.error(e);
        return res.validSend(500, { error: e });
    }
}


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
                    // location: {$regex: search,
                    //     $options: 'i'},
                }

            ]
        }
        var netNodes = await NetNode.find(dbQuery, { _id: 0 }).
            populate({ path: "switchId", select:[ "name","_id"] })
            .populate({ path: "vlan", select: [ "name","_id"] })
            .populate({ path: "device", select: [ "name","_id"] })
            .populate({ path: "location", select: [ "name","_id"] });
        // console.plain(netNodes)
        var data = []
        netNodes.map(n => {
            console.plain("n: ", n)
            data.push({
                _id: n._id,
                patchPanelPort: n.patchPanelPort,
                cableNumber: n.cableNumber,
                switchName: n.switchId.name,
                switchPort: n.switchPort,
                vlan: n.vlan.name,
                device: n.device.name,
                description: n.description,
                location: n.location.name,

                switchId:n.switchId._id,
                vlanId:n.vlan._id,
                deviceId:n.device._id,
                locationId:n.location._id,
            })

        })

        var finalResult = {
            columns: {
                patchPanelPort: "شماره patch panel",
                cableNumber: "شماره کابل",
                switchName: "سوییچ",
                switchPort: "شماره پورت سوییچ",
                vlan: "شبکه مجازی",
                device: "نوع",
                description: "توضیحات",
                location: "مکان",
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
 

