import Switch from "../models/Switch";
import Location from "../models/Location";

/*          POST /api/switches/new            */
export let new_Switch = async (req, res) => {
  if (!req.validate(["name", "model"])) return;
  var { name, ip, description, model, diagramUrl, location,code } = req.body;
  try {
    var sw = new Switch({
      name,
      ip,
      description,
      model,
      diagramUrl,
      location,
      code,
    });
    var savedSW = await sw.save();
    return res.validSend(200, { switch: savedSW });
  } catch (e) {
    console.error(e);
    return res.validSend(500, { error: e });
  }
};

/*          POST /api/switches/all            */
export let all_Switches = async (req, res) => {
  try {
    var swList = await Switch.find({status:0}).populate({
      path: "location",
      select: "name"
    });
    var data = [];
    swList.map(n => {
      var location="";
      if(n.location) location=n.location
      data.push({
        _id: n._id,
        name: n.name,
        ip: n.ip,
        model: n.model,
        diagramUrl: n.diagramUrl,
        locationName: location.name,
        code:n.code,
        description: n.description,        
      });
    });

    var finalResult = {
      columns: {
        name: "نام",
        ip: "آدرس",
        model: "مدل",
        diagramUrl: "نمودار",
        locationName: "مکان",
        code:"شماره اموال",
        description: "توضیحات",
      },
      switchesData: data
    };

    return res.validSend(200, { switches: finalResult });
  } catch (e) {
    console.error(e);
    return res.validSend(500, { error: e });
  }
};

/*          POST /api/switches/all/name            */
export let all_SwitchesNames = async (req, res) => {
  try {
    var switches = await Switch.find({ status: 0 })
      .select({ name: 1 })
      .lean();
    return res.validSend(200, { switches });
  } catch (e) {
    console.error(e);
    return res.validSend(500, { error: e });
  }
};

/*          POST /api/switches/select/one            */
export let select_Switche_byId = async (req, res) => {

  try {
    var switchInfo = await Switch.findById(req.body._id).populate({path:"location",select:["name"]})
      .lean();
      if(res.switchInfo.status===0)
    return res.validSend(200, { switchInfo });
    else return res.validSend(500, { error: "nothing to return..." });
  } catch (e) {
    console.error(e);
    return res.validSend(500, { error: e });
  }
};

/*          POST /api/netnodes/search            */
export let search_Switches = async (req, res) => {
  console.plain(req.body);
  try {
    var { search } = req.body;
    if (!search) search = "";
    var dbQuery = {
      $or: [
        {
          name: {
            $regex: search,
            $options: "i"
          }
        },
        {
          ip: {
            $regex: search,
            $options: "i"
          }
        },
        {
          description: {
            $regex: search,
            $options: "i"
          }
        },
        {
          model: {
            $regex: search,
            $options: "i"
          },
        },
        {
          code: {
            $regex: search,
            $options: "i"
          },
        },
      ]
    };
    var finalQuery={$and:[dbQuery,{status:0}]}
    var locations=await Location.find({name:{$regex:search,$options:'i'}}).lean();
    if(locations.length>0)dbQuery["$or"].push({location:{$in:locations}})

    var swList = await Switch.find(finalQuery, { _id: 0 }).populate({
      path: "location",
      select: "name"
    });

    
    var data = [];
    swList.map(n => {
      var location="";
    if(n.location)location=n.location
      data.push({
        _id: n._id,
        name: n.name,
        ip: n.ip,
        description: n.description,
        model: n.model,
        diagramUrl: n.diagramUrl,
        locationName: location.name,
        code:n.code,
      });
    });

    var finalResult = {
      columns: {
        name: "نام",
        ip: "آدرس",
        model: "مدل",
        diagramUrl: "نمودار",
        locationName: "مکان",
        code:"شماره اموال",
        description: "توضیحات",
      },
      switchesData: data
    };

    return res.validSend(200, { switches: finalResult });
  } catch (e) {
    console.error(e);
    return res.validSend(500, { error: e });
  }
};

/*          POST /api/switches/update            */

export let update_Switch = async (req, res) => {
  // router.post("/update", auth, upload.single('logo'),function(req, res) {
  if (!req.validate(["_id"])) return;
  var { name, ip, description, model, diagramUrl, location, _id,code } = req.body;
  var query = { name, ip, description, model, diagramUrl, location,code };
  try {
    await Switch.update({ _id }, query);
    return res.validSend(200, { message: "Update is successful" });
  } catch (e) {
    console.error(e);
    return res.validSend(500, { error: e });
  }
};

/*          POST /api/switches/delete            */

// {"arrayOfIds":["5b554f952e3eb30b1890d638"]}

export let delete_switch=async(req,res)=>{
  if(!req.validate(["arrayOfIds"]))return;
var { arrayOfIds } = req.body;
console.plain(arrayOfIds)
          
  try{
      await Switch.update({_id:{ $in : arrayOfIds }},{status:1},{ multi: true})
      return res.validSend(200,{message:"delete is successful"});

  }catch(e){
      console.error(e);
      return res.validSend(500,{error:e});
  }
}
