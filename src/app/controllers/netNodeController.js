import NetNode from '../models/NetNode'
import Location from '../models/Location'
import Vlan from '../models/Vlan';
import Switch from '../models/Switch';
import Device from '../models/Device'

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
    // console.plain("req.body: ",req.body)
    // var { limit, skip, isTable } = req.body;
    var { page, size, isTable } = req.body;
    var limit = size;
    var skip = size * (page - 1)
    try {
        if (page == 1)
            var dataLength = await NetNode.find({ status: 0 }).count()
        var netNodes = await NetNode.find({ status: 0 }).limit(limit).skip(skip)
            .populate({ path: "switchId", select: ["name", "_id"] })
            .populate({ path: "vlan", select: ["name", "_id"] })
            .populate({ path: "device", select: ["name", "_id"] })
            .populate({ path: "location", select: ["name", "_id"] })
        var data = []
        var finalResult;
        if (!isTable) {
            netNodes.map(n => {
                data.push({
                    summary: n.patchPanelPort,
                    details: {
                        _id: n._id,
                        "شماره نود": n.patchPanelPort,
                        "شماره patch cord": n.cableNumber,
                        "شماره پورت سوییچ": n.switchPort,
                        "سوییچ": n.switchId ? (n.switchId.name) : "",
                        "شبکه مجازی": n.vlan ? (n.vlan.name) : "",
                        "نوع": n.device ? (n.device.name) : "",
                        "مکان": n.location ? (n.location.name) : "",
                        "توضیحات": n.description,
                    }

                })
            })
            finalResult = { netNodesData: data }


        }
        else {
            netNodes.map(n => {
                data.push({
                    _id: n._id,
                    patchPanelPort: n.patchPanelPort,
                    cableNumber: n.cableNumber,
                    switchPort: n.switchPort,
                    switchName: n.switchId ? (n.switchId.name) : "",
                    vlanName: n.vlan ? (n.vlan.name) : "",
                    deviceName: n.device ? (n.device.name) : "",
                    locationName: n.location ? (n.location.name) : "",
                    description: n.description,

                    switchId: n.switchId ? (n.switchId._id) : "",
                    vlanId: n.vlan ? (n.vlan._id) : "",
                    deviceId: n.device ? (n.device._id) : "",
                    locationId: n.location ? (n.location._id) : "",
                })
            })
            finalResult = {
                columns: {
                    patchPanelPort: "شماره نود",
                    cableNumber: "شماره patch cord",
                    switchName: "سوییچ",
                    switchPort: "شماره پورت سوییچ",
                    // vlanName: "شبکه مجازی",
                    // deviceName: "نوع",
                    // description: "توضیحات",
                    // locationName: "مکان",
                },
                netNodesData: data
            }
        }
        if (netNodes.length < limit) finalResult.finished = true
        else finalResult.finished = false
        finalResult.dataLength = dataLength
        // console.plain("finalResult: ", finalResult)
        return res.validSend(200, { netNodes: finalResult });
    } catch (e) {
        console.error(e);
        return res.validSend(500, { error: e });
    }
}

// export let all_NetNodes_deatails = async (req, res) => {
//     var {limit,skip}=req.body;
//     try {
//         var netNodes = await NetNode.find({ status: 0 }).limit(limit).skip(skip)
//             .populate({ path: "switchId", select: ["name", "_id"] })
//             .populate({ path: "vlan", select: ["name", "_id"] })
//             .populate({ path: "device", select: ["name", "_id"] })
//             .populate({ path: "location", select: ["name", "_id"] })
//         var data = []
//         netNodes.map(n => {
//         //     var details = "شماره نود" + n.patchPanelPort + "\n" +
//         //     "شماره patch cord" + n.cableNumber + "\n" +
//         //     "شماره پورت سوییچ" + n.switchPort + "\n" +
//         //     "سوییچ" + n.switchId ? (n.switchId.name) : "" + "\n" +
//         //         "شبکه مجازی" + n.vlan ? (n.vlan.name) : "" + "\n" +
//         //             "نوع" + n.device ? (n.device.name) : "",
//         // "مکان" + n.location ? (n.location.name) : "" + "\n" +
//         //     "توضیحات" + n.description
//             data.push({
//                 summary:n.patchPanelPort,
//                 details:{
//                 // _id: n._id,
//                 "شماره نود": n.patchPanelPort,
//                 "شماره patch cord": n.cableNumber,
//                 "شماره پورت سوییچ": n.switchPort,
//                 "سوییچ": n.switchId ? (n.switchId.name) : "",
//                 "شبکه مجازی": n.vlan ? (n.vlan.name) : "",
//                 "نوع": n.device ? (n.device.name) : "",
//                 "مکان": n.location ? (n.location.name) : "",
//                 "توضیحات": n.description,
//                 }

//             })
//         })

//         return res.validSend(200, { netNodes: data });
//     } catch (e) {
//         console.error(e);
//         return res.validSend(500, { error: e });
//     }
// }

/*          POST /api/netNodes/select/one            */
export let select_NetNode_byId = async (req, res) => {
    try {
        var netNodeInfo = await NetNode.findById(req.body._id)
            .populate({ path: "switchId", select: ["name", "_id"] })
            .populate({ path: "vlan", select: ["name", "_id"] })
            .populate({ path: "device", select: ["name", "_id"] })
            .populate({ path: "location", select: ["name", "_id"] })
            .lean();
        if (netNodeInfo.status === 0)
            return res.validSend(200, { netNodeInfo });
        else return res.validSend(500, { error: "nothing to return..." });
    } catch (e) {
        console.error(e);
        return res.validSend(500, { error: e });
    }
};
/*          POST /api/netnodes/summary            */

export let summary_NetNodes = async (req, res) => {
    
    try {
        var {rowsCount}=req.body;
        var dataLength = await NetNode.find({ status: 0 }).count()
        var netNodes = await NetNode.find({ status: 0 }).sort({"updatedAt":-1}).limit(rowsCount)
            .populate({ path: "switchId", select: ["name", "_id"] })
            .populate({ path: "vlan", select: ["name", "_id"] })
            .populate({ path: "device", select: ["name", "_id"] })
            .populate({ path: "location", select: ["name", "_id"] })
        var data = []
        var finalResult;
            netNodes.map(n => {
                data.push({
                    summary: n.patchPanelPort,
                    details: {
                        _id: n._id,
                        "شماره نود": n.patchPanelPort,
                        "شماره patch cord": n.cableNumber,
                        "شماره پورت سوییچ": n.switchPort,
                        "سوییچ": n.switchId ? (n.switchId.name) : "",
                        "شبکه مجازی": n.vlan ? (n.vlan.name) : "",
                        "نوع": n.device ? (n.device.name) : "",
                        "مکان": n.location ? (n.location.name) : "",
                        "توضیحات": n.description,
                    }

                })
            })
            finalResult = {  data }
            finalResult.dataLength=dataLength
        return res.validSend(200,  finalResult );
    } catch (e) {
        console.error(e);
        return res.validSend(500, { error: e });
    }
}
/*          POST /api/netnodes/search            */
export let search_NetNodes = async (req, res) => {
    console.plain("req.body:::::::", req.body)
    var { page, size, isTable } = req.body;
    var limit = size;
    var skip = size * (page - 1)
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
                    "switchPort": {
                        $regex: search,
                        $options: 'i'
                    },
                }, {
                    "description": {
                        $regex: search,
                        $options: 'i'
                    },
                },
            ]
        }

        var finalQuery = { $and: [dbQuery, { status: 0 }] }
        var locations = await Location.find({ name: { $regex: search, $options: 'i' } }).lean();
        var vlans = await Vlan.find({ name: { $regex: search, $options: 'i' } }).lean();
        var switches = await Switch.find({ name: { $regex: search, $options: 'i' } }).lean();
        var devices = await Device.find({ name: { $regex: search, $options: 'i' } }).lean();
        locations = locations.map(l => l._id)
        if (locations.length > 0) dbQuery["$or"].push({ location: { $in: locations } }, { vlan: { $in: vlans } }, { device: { $in: devices } }, { switchId: { $in: switches } })
        if (page == 1)
        var dataLength = await NetNode.find(finalQuery).count()
        var netNodes = await NetNode.find(finalQuery).limit(limit).skip(skip)
            .populate({ path: "switchId", select: ["name", "_id"] })
            .populate({ path: "vlan", select: ["name", "_id"] })
            .populate({ path: "device", select: ["name", "_id"] })
            .populate({ path: "location", select: ["name", "_id"] }).lean()
        // console.plain(netNodes)
        var data = []
        var finalResult;
        if (!isTable) {
            netNodes.map(n => {
                data.push({
                    summary: n.patchPanelPort,
                    details: {
                        _id: n._id,
                        "شماره نود": n.patchPanelPort,
                        "شماره patch cord": n.cableNumber,
                        "شماره پورت سوییچ": n.switchPort,
                        "سوییچ": n.switchId ? (n.switchId.name) : "",
                        "شبکه مجازی": n.vlan ? (n.vlan.name) : "",
                        "نوع": n.device ? (n.device.name) : "",
                        "مکان": n.location ? (n.location.name) : "",
                        "توضیحات": n.description,
                    }

                })
            })
            finalResult = { netNodesData: data }
        }
        else {
            netNodes.map(n => {

                if (n.vlan) vlans = n.vlan
                if (n.device) devices = n.device
                if (n.location) locations = n.location
                data.push({
                    _id: n._id,
                    patchPanelPort: n.patchPanelPort,
                    cableNumber: n.cableNumber,
                    switchPort: n.switchPort,
                    switchName: n.switchId ? (n.switchId.name) : "",
                    vlanName: n.vlan ? (n.vlan.name) : "",
                    deviceName: n.device ? (n.device.name) : "",
                    locationName: n.location ? (n.location.name) : "",
                    descriptionName: n.description,

                    switchId: n.switchId ? (n.switchId._id) : "",
                    vlanId: n.vlan ? (n.vlan._id) : "",
                    deviceId: n.device ? (n.device._id) : "",
                    locationId: n.location ? (n.location._id) : "",
                })
            })

            var finalResult = {
                columns: {
                    patchPanelPort: "شماره نود",
                    cableNumber: "شماره patch cord",
                    switchName: "سوییچ",
                    switchPort: "شماره پورت سوییچ",
                    // vlanName: "شبکه مجازی",
                    // deviceName: "نوع",
                    // description: "توضیحات",
                    // locationName: "مکان",
                },
                netNodesData: data
            }
        }
        if (netNodes.length < limit) finalResult.finished = true
        else finalResult.finished = false
        finalResult.dataLength = dataLength
        console.plain("finalResult: ", finalResult)
        return res.validSend(200, { netNodes: finalResult, finished: finalResult.finished });

    }
    catch (e) {
        console.error(e);
        return res.validSend(500, { error: e });
    }
}


/*          POST /api/netnodes/update            */

export let update_netNode = async (req, res) => {
    console.log("req.body: ", req.body)
    // router.post("/update", auth, upload.single('logo'),function(req, res) {
    if (!req.validate(["_id"])) return;
    var { _id, patchPanelPort, cableNumber, switchId, switchPort, vlan, device, description, location } = req.body;
    var query = { patchPanelPort, cableNumber, switchId, switchPort, vlan, device, description, location }
    try {
        await NetNode.update({ _id }, query)
        return res.validSend(200, { message: "Update is successful" });
    }
    catch (e) {
        console.error(e);
        return res.validSend(500, { error: e });
    }
}


/*          POST /api/netnodes/disconnect            */

export let disconnect_netNode = async (req, res) => {
    // router.post("/disconnect", auth, upload.single('logo'),function(req, res) {
    if (!req.validate(["_id"])) return;
    var { _id } = req.body;
    var { cableNumber, switchId, switchPort, vlan, device, description, location } = "";
    var query = { cableNumber, switchId, switchPort, vlan, device, description, location }
    try {
        await NetNode.update({ _id }, query)
        return res.validSend(200, { message: "Disconnection is successful" });
    }
    catch (e) {
        console.error(e);
        return res.validSend(500, { error: e });
    }
}


/*          POST /api/netnodes/delete            */

// {"arrayOfIds":["5b554f952e3eb30b1890d638"]}

export let delete_netNode = async (req, res) => {
    if (!req.validate(["arrayOfIds"])) return;
    var { arrayOfIds } = req.body;
    try {
        await NetNode.update({ _id: { $in: arrayOfIds } }, { status: 1 }, { multi: true })
        return res.validSend(200, { message: "delete is successful" });

    } catch (e) {
        console.error(e);
        return res.validSend(500, { error: e });
    }
}
/*          POST /api/netnodes/recover            */

export let recover_netNode = async (req, res) => {
    if (!req.validate(["arrayOfIds"])) return;
    var { arrayOfIds } = req.body;
    try {
        await NetNode.update({ _id: { $in: arrayOfIds } }, { status: 0 }, { multi: true })
        return res.validSend(200, { message: "recovery progress is successful" });
    } catch (e) {
        console.error(e);
        return res.validSend(500, { error: e });
    }
}


/*          POST /api/netnodes/PRTG            */
export let prtg_NetNodes = async (req, res) => {
    try {

        var { switchName, switchPort } = req.body;


        // var finalQuery = { $and: [dbQuery, { status: 0 }] }
        // var locations = await Location.find({ name: { $regex: search, $options: 'i' } }).lean();
        // var vlans = await Vlan.find({ name: { $regex: search, $options: 'i' } }).lean();
        var switches = await Switch.find({ name: switchName }).lean();
        // var devices = await Device.find({ name: { $regex: search, $options: 'i' } }).lean();
        // locations = locations.map(l => l._id)
        //  if (locations.length > 0) dbQuery["$or"].push({ location: { $in: locations } }, { vlan: { $in: vlans } }, { device: { $in: devices } }, { switchId: { $in: switches } })
        var netNodes = await NetNode.find({ switchId: { $in: switches }, switchPort, status: 0 }, { _id: 0 }).
            populate({ path: "switchId", select: ["name", "_id"] })
            .populate({ path: "vlan", select: ["name", "_id"] })
            .populate({ path: "device", select: ["name", "_id"] })
            .populate({ path: "location", select: ["name", "_id"] })
        var data;
        netNodes.map(n => {
            console.log("n: ", n)

            // if (n.vlan) vlans = n.vlan
            if (n.device) devices = n.device
            // if (n.location) locations = n.location
            data = {
                // _id: n._id,
                patchPanelPort: n.patchPanelPort,
                cableNumber: n.cableNumber,
                switchPort: n.switchPort,
                switchName: n.switchId ? (n.switchId.name) : "",
                vlanName: n.vlan ? (n.vlan.name) : "",
                deviceName: n.device ? (n.device.name) : "",
                locationName: n.location ? (n.location.name) : "",
                description: n.description,
            }
            // data={

            //     "شماره نود": n.patchPanelPort,

            //     "شماره پورت سوییچ": n.switchPort,
            //     "نام سوییچ": n.switchId ? (n.switchId.name) : "",
            //     "VLAN": n.vlan ? (n.vlan.name) : "",
            //     "وسیله": n.device ? (n.device.name) : "",
            //     "مکان": n.location ? (n.location.name) : "",
            //     "توضیحات": n.description,
            // }

        })


        return res.validSend(200, data);

    }
    catch (e) {
        console.error(e);
        return res.validSend(500, { error: e });
    }
}

//////////////////////////////////////////////////////////////////////////

// JUST FOR INITIALIZATION
/*          POST /api/netnodes/hiNetNode            */

export let init_netNode = async (req, res) => {


    try {
        var patchPanelPortArray = []
        var I, K = "";
        var netNodes = [];
        for (var i = 0; i <= 10; i++) {
            for (var j = 1; j <= 8; j++) {
                for (var k = 1; k <= 24; k++) {

                    i < 10 ? (I = '0' + i.toString()) : I = i
                    k < 10 ? (K = '0' + k.toString()) : K = k
                    patchPanelPortArray.push("R" + I + "P" + j + K)
                }
            }
        }
        // console.plain("patchPanelPortArray: ", patchPanelPortArray)

        patchPanelPortArray.map(patchPanelPort => {
            // console.plain("patchPanelPort: ", patchPanelPort)
            var nNode = new NetNode({ patchPanelPort, location: null });
            var netNode = nNode.save();
            netNodes.push(netNode);
        })
        return res.validSend(200, { netNodes });
    } catch (e) {
        console.error(e);
        return res.validSend(500, { error: e });
    }
}



