import Switch from "../models/Switch";

/*          POST /api/switches/new            */
export let new_Switch = async (req, res) => {
  if (!req.validate(["name", "model"])) return;
  var { name, ip, description, model, diagramUrl, location } = req.body;
  try {
    var sw = new Switch({
      name,
      ip,
      description,
      model,
      diagramUrl,
      location
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
      data.push({
        _id: n._id,
        name: n.name,
        ip: n.ip,
        description: n.description,
        model: n.model,
        diagramUrl: n.diagramUrl,
        locationName: n.location.name
      });
    });

    var finalResult = {
      columns: {
        name: "نام",
        ip: "آدرس",
        description: "توضیحات",
        model: "مدل",
        diagramUrl: "نمودار",
        locationName: "مکان"
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
    return res.validSend(200, { switchInfo });
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
       
        // {
        //           location:{ name:{$regex: search,
        //               $options: 'i'}}
        // }
      ]
    };
    var finalQuery={$and:[dbQuery,{status:0}]}

    var swList = await Switch.find(finalQuery, { _id: 0 }).populate({
      path: "location",
      select: "name"
    });

    var data = [];
    swList.map(n => {
      data.push({
        _id: n._id,
        name: n.name,
        ip: n.ip,
        description: n.description,
        model: n.model,
        diagramUrl: n.diagramUrl,
        locationName: n.location.name
      });
    });

    var finalResult = {
      columns: {
        name: "نام",
        ip: "آدرس",
        description: "توضیحات",
        model: "مدل",
        diagramUrl: "نمودار",
        locationName: "مکان"
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
  var { name, ip, description, model, diagramUrl, location, _id } = req.body;
  var query = { name, ip, description, model, diagramUrl, location };
  try {
    await Switch.update({ _id }, query);
    return res.validSend(200, { message: "Update is successful" });
  } catch (e) {
    console.error(e);
    return res.validSend(500, { error: e });
  }
};
