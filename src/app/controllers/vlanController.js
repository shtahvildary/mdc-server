import Vlan from '../models/Vlan'

/*          POST /api/vlans/new            */
export let new_Vlan=async(req,res)=>{
    if(!req.validate(["number"]))return;
    var {number,name,ip,firstIp,lastIp,subnetMask,diagramUrl,description}=req.body;
    try{
        var virtualLan=new Vlan({number,name,ip,firstIp,lastIp,subnetMask,diagramUrl,description});
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
        var vlans= await Vlan.find({status:0});
        var data=[]
        vlans.map(n=>{
            data.push({
                _id:n._id,
                name:n.name,
                number:n.number,
                ip:n.ip,
                firstIp:n.firstIp,
                lastIp:n.lastIp,
                subnetMask:n.subnetMask,
                diagramUrl:n.diagramUrl,
                description:n.description
            })
        })
        var finalResult={
            columns:{
                name:"Name",
                number:"Number",
                ip:"IP",
                diagramUrl:"graph",
                // firstIp:"First IP",
                // lastIp:"Last IP",
                // subnetMask:"subnet mask",
                // description:"Description",
            },
            vlansData:data,
        }
        return res.validSend(200,{vlans:finalResult});
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}
/*          POST /api/vlans/summary            */

export let summary_Vlans=async(req,res)=>{
  try{
    var {rowsCount}=req.body;
    var dataLength=await Vlan.find({status:0}).count()
    var vlans= await Vlan.find({status:0}).limit(rowsCount);
    var data=[];
    var finalResult;
    vlans.map(n=>{
      data.push({
        summary:n.name,
        details:{
          _id:n._id,
          "نام":n.name,
          "شماره":n.number,
          "آی پی":n.ip,
          "اولین آی پی":n.firstIp,
          "آخرین آی پی":n.lastIp,
          subnetMask:n.subnetMask,
          "گراف":n.diagramUrl,
          "توضیحات":n.description
        }
      })
    })

    finalResult={data}
    finalResult.dataLength=dataLength
    return res.validSend(200,finalResult);
  }
  catch (e) {
    console.error(e);
    return res.validSend(500, { error: e });
}
}

/*          POST /api/vlans/select/one            */
export let select_Vlan_byId = async (req, res) => {

    try {
      var vlanInfo = await Vlan.findById(req.body._id) .lean();
      console.plain("vlanInfo: ",vlanInfo)
      if(vlanInfo.status===0)
      return res.validSend(200, { vlanInfo });
      else return res.validSend(500, { error: "nothing to return..." });
    } catch (e) {
      console.error(e);
      return res.validSend(500, { error: e });
    }
  };

/*          POST /api/vlans/all/name            */
export let all_Vlans_Names=async(req,res)=>{
    try{
        var vlans= await Vlan.find({status:0}).select({name:1}).lean();
        return res.validSend(200,{vlans});
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}

/*          POST /api/vlans/search            */
export let search_Vlans = async (req, res) => {

    console.plain(req.body);
    try {
      var { search } = req.body;
      if (!search) search = "";
      console.log(search)
      var dbQuery = {
        $or: [
          
            {name:{
              $regex:search,
              $options:"i",
            }},
            {number: {
              $regex: search,
              $options: "i"
            }},
          
           { ip: {
              $regex: search,
              $options: "i"  
          }},
          
            {firstIp: {
              $regex: search,
              $options: "i"
            
          }},
          
            {lastIp: {
              $regex: search,
              $options: "i"
            }},
           { subnetMask: {
              $regex: search,
              $options: "i"
          }},
         { description:{
            $regex: search,
            $options: "i"
        }}
        ]
      };
      var finalQuery={$and:[dbQuery,{status:0}]}
  
      var vlans = await Vlan.find(finalQuery)
  
      console.plain(vlans);
      var data = [];
      vlans.map(n => {
        data.push({
            _id:n._id,
            name:n.name,
            number:n.number,
            ip:n.ip,
            firstIp:n.firstIp,
            lastIp:n.lastIp,
            subnetMask:n.subnetMask,
            diagramUrl:n.diagramUrl,
            description:n.description
        })
    })
    var finalResult={
        columns:{
            name:"Name",
            number:"Number",
            ip:"IP",
            diagramUrl:"graph",
            // firstIp:"First IP",
            // lastIp:"Last IP",
            // subnetMask:"subnet mask",
            // description:"Description",
        },
        vlansData:data,
    }
      return res.validSend(200, { vlans: finalResult });
    } catch (e) {
      console.error(e);
      return res.validSend(500, { error: e });
    }
  };

  /*          POST /api/vlans/update            */

export let update_Vlan = async (req, res) => {
    if (!req.validate(["_id"])) return;
    var {_id,number,name,ip,firstIp,lastIp,subnetMask,diagramUrl,description}=req.body;
   
    var query = { number,name,ip, firstIp, lastIp, subnetMask ,diagramUrl,description};
    try {
      await Vlan.update({ _id }, query);
      return res.validSend(200, { message: "Update is successful" });
    } catch (e) {
      console.error(e);
      return res.validSend(500, { error: e });
    }
  };

  /*          POST /api/vlans/delete            */

// {"arrayOfIds":["5b554f952e3eb30b1890d638"]}

export let delete_vlan=async(req,res)=>{
    if(!req.validate(["arrayOfIds"]))return;
var { arrayOfIds } = req.body;
            
    try{
        await Vlan.update({_id:{ $in : arrayOfIds }},{status:1},{ multi: true})
        return res.validSend(200,{message:"delete is successful"});

    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}
  