import Location from '../models/Location'

/*      POST /api/locations/new     */
export let new_Location=async(req,res)=>{
    if(!req.validate(["name","building"])) return;
    var {name,description,building,fHf,level,room}=req.body;
    try{
        var loc=new Location({name,description,building,fHf,level,room});
        var savedLocation=await loc.save();
        return res.validSend(200,{location:savedLocation})

    }
    catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}

/*      POST    /api/locations/all      */
export let all_Locations=async(req,res)=>{
    try{
        var locList=await Location.find({status:0});
        var data=[];
        locList.map(n=>{
          var fHfLevel=""
          console.log("n.fHf: ",n.fHf)

          if(n.fHf==0) fHfLevel="طبقه "+n.level
          else fHfLevel="نیم طبقه "+n.level
          console.log("fHfLevel: ",fHfLevel)
            data.push({
                _id:n._id,
                name:n.name,
                building:n.building,
                fHfLevel:fHfLevel,
                room:n.room,
                description:n.description,
            })
        })

        var finalResult={
            columns:{
              name:"نام",
                building:"ساختمان",
                // fHfLevel:"طبقه / نیم طبقه",
                // room:"اتاق",
                // description:"توضیحات",
            },
            locationsData:data
        }
        return res.validSend(200,{locations:finalResult})
    }
    catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}

/*      POST    /api/locations/select/one      */
export let select_Location_byId = async (req, res) => {
  try {
    var locationInfo = await Location.findById(req.body._id) .lean();
    if(locationInfo.status===0)
    return res.validSend(200, { locationInfo });
    else return res.validSend(500, { error: "nothing to return..." });
  } catch (e) {
    console.error(e);
    return res.validSend(500, { error: e });
  }
};

/*          POST /api/locations/all/name            */
export let all_Locations_Names=async(req,res)=>{
    try{
        var locations= await Location.find({status:0}).select({name:1}).lean();
        return res.validSend(200,{locations});
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}

/*          POST /api/locations/search            */
export let search_Locations = async (req, res) => {

    console.plain(req.body);
    try {
      var { search } = req.body;
      if (!search) search = "";
      var dbQuery = {
        $or: [{
            name:{
              $regex:search,
              $options:"i",
            }
          },
          {
            building: {
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
            level: {
              $regex: search,
              $options: "i"
          }
        },
        {
            room: {
              $regex: search,
              $options: "i"
            }
          }  
        ]
      };
      var finalQuery={$and:[dbQuery,{status:0}]}
  
      var locList = await Location.find(finalQuery, { _id: 0 })
      console.plain(locList);
      var data = [];
      locList.map(n => {

        var fHfLevel=""
        if(n.fHf===0) fHfLevel="طبقه "+n.level
        else fHfLevel="نیم طبقه "+n.level
          data.push({
              _id:n._id,
              name:n.name,
              building:n.building,
              fHfLevel:fHfLevel,
              room:n.room,
              description:n.description,
          })
      })
      var finalResult={
          columns:{
            name:"نام",
              building:"ساختمان",
              // fHfLevel:"طبقه / نیم طبقه",
              // room:"اتاق",
              // description:"توضیحات",
          },
          locationsData:data
    }
  
      return res.validSend(200, { locations: finalResult });
    } catch (e) {
      console.error(e);
      return res.validSend(500, { error: e });
    }
  };

  /*          POST /api/locations/update            */

export let update_Location = async (req, res) => {
    // router.post("/update", auth, upload.single('logo'),function(req, res) {
    if (!req.validate(["_id"])) return;
    var {name,description,building,fHf,level,room,_id}=req.body;
   
    var query = { name,description, building, fHf, level, room };
    try {
      await Location.update({ _id }, query);
      return res.validSend(200, { message: "Update is successful" });
    } catch (e) {
      console.error(e);
      return res.validSend(500, { error: e });
    }
  };

  /*          POST /api/switches/delete            */

// {"arrayOfIds":["5b554f952e3eb30b1890d638"]}

export let delete_location=async(req,res)=>{
  if(!req.validate(["arrayOfIds"]))return;
var { arrayOfIds } = req.body;
console.plain(arrayOfIds)
          
  try{
      await Location.update({_id:{ $in : arrayOfIds }},{status:1},{ multi: true})
      return res.validSend(200,{message:"delete is successful"});

  }catch(e){
      console.error(e);
      return res.validSend(500,{error:e});
  }
}
  