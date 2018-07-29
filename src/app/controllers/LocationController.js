import Location from '../models/Location'

/*      POST /api/locations/new     */
export let new_Location=async(req,res)=>{
    if(!req.validate(["building"])) return;
    var {description,building,floor,halfFloor,room}=req.body;
    try{
        var loc=new Location({description,building,floor,halfFloor,room});
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
            data.push({
                _id:n._id,
                building:n.building,
                floor:n.floor,
                halfFloor:n.halfFloor,
                room:n.room,
                description:n.description,
            })
        })
        var finalResult={
            columns:{
                building:"ساختمان",
                floor:"طبقه",
                halfFloor:"نیم طبقه",
                room:"اتاق",
                description:"توضیحات",
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

// /*          POST /api/locations/all/name            */
// export let all_Locations_Names=async(req,res)=>{
//     try{
//         var locations= await Location.find({status:0}).select({name:1}).lean();
//         return res.validSend(200,{locations});
//     }catch(e){
//         console.error(e);
//         return res.validSend(500,{error:e});
//     }
// }

/*          POST /api/locations/search            */
export let search_Locations = async (req, res) => {

    console.plain(req.body);
    try {
      var { search } = req.body;
      if (!search) search = "";
      var dbQuery = {
        $or: [
          {
            building: {
              $regex: search,
              $options: "i"
            }
          },
          {
            floor: {
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
            halfFloor: {
              $regex: search,
              $options: "i"
            },
            room: {
              $regex: search,
              $options: "i"
            }
            
          }
        ]
      };
      var finalQuery={$and:[dbQuery,{status:0}]}
  
      var locList = await Switch.find(finalQuery, { _id: 0 })
  
      console.plain(locList);
      var data = [];
      locList.map(n => {
        data.push({
            _id:n._id,
            building:n.building,
            floor:n.floor,
            halfFloor:n.halfFloor,
            room:n.room,
            description:n.description,
        })
    })
    var finalResult={
        columns:{
            building:"ساختمان",
            floor:"طبقه",
            halfFloor:"نیم طبقه",
            room:"اتاق",
            description:"توضیحات",
        },
        locationsData:data
    }
  
      return res.validSend(200, { switches: finalResult });
    } catch (e) {
      console.error(e);
      return res.validSend(500, { error: e });
    }
  };

  /*          POST /api/locations/update            */

export let update_Location = async (req, res) => {
    // router.post("/update", auth, upload.single('logo'),function(req, res) {
    if (!req.validate(["_id"])) return;
    var {description,building,floor,halfFloor,room,_id}=req.body;
   
    var query = { description, building, floor, halfFloor, room };
    try {
      await Location.update({ _id }, query);
      return res.validSend(200, { message: "Update is successful" });
    } catch (e) {
      console.error(e);
      return res.validSend(500, { error: e });
    }
  };
  