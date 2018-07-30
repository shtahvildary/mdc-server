import Vlan from '../models/Vlan'

/*          POST /api/vlans/new            */
export let new_Vlan=async(req,res)=>{
    if(!req.validate(["number"]))return;
    var {number,name,ip,firstIp,lastIp,subnetMask,description}=req.body;
    try{
        var virtualLan=new Vlan({number,name,ip,firstIp,lastIp,subnetMask,description});
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
        var vlans= await Vlan.find({});
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
                description:n.description
            })
        })
        var finalResult={
            columns:{
                name:"نام",
                number:"شماره",
                ip:"آی پی",
                firstIp:"اولین آی پی",
                lastIp:"آخرین آی پی",
                subnetMask:"subnet mask",
                description:"توضیحات",
            },
            vlansData:data,
        }
        return res.validSend(200,{vlans:finalResult});
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}

/*          POST /api/vlans/select/one            */
export let select_Vlan_byId = async (req, res) => {

    try {
      var vlanInfo = await Vlan.findById(req.body._id) .lean();
      return res.validSend(200, { vlanInfo });
    } catch (e) {
      console.error(e);
      return res.validSend(500, { error: e });
    }
  };

/*          POST /api/vlans/all/name            */
export let all_Vlans_Names=async(req,res)=>{
    try{
        var vlans= await Vlan.find({}).select({name:1}).lean();
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
      var dbQuery = {
        $or: [{
          
            name:{
              $regex:search,
              $options:"i",
            },
            number: {
              $regex: search,
              $options: "i"
            },
          
          
            ip: {
              $regex: search,
              $options: "i"
            
          },
          
            firstIp: {
              $regex: search,
              $options: "i"
            
          },
          
            lastIp: {
              $regex: search,
              $options: "i"
            },
            subnetMask: {
              $regex: search,
              $options: "i"
          },
          description:{
            $regex: search,
            $options: "i"
        },

        }
        ]
      };
      var finalQuery={$and:[dbQuery,{status:0}]}
  
      var vlans = await Vlan.find(finalQuery, { _id: 0 })
  
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
            description:n.description
        })
    })
    var finalResult={
        columns:{
            name:"نام",
            number:"شماره",
            ip:"آی پی",
            firstIp:"اولین آی پی",
            lastIp:"آخرین آی پی",
            subnetMask:"subnet mask",
            description:"توضیحات",
        },
        vlansData:data,
    }
      return res.validSend(200, { locations: finalResult });
    } catch (e) {
      console.error(e);
      return res.validSend(500, { error: e });
    }
  };

  /*          POST /api/vlans/update            */

export let update_Vlan = async (req, res) => {
    if (!req.validate(["_id"])) return;
    var {number,name,ip,firstIp,lastIp,subnetMask,description}=req.body;
   
    var query = { number,name,ip, firstIp, lastIp, subnetMask ,description};
    try {
      await Vlan.update({ _id }, query);
      return res.validSend(200, { message: "Update is successful" });
    } catch (e) {
      console.error(e);
      return res.validSend(500, { error: e });
    }
  };
  