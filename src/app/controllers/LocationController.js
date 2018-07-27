import Location from '../models/Location'

/*      POST /api/locations/new     */
export let newLocation=async(req,res)=>{
    if(!req.validate(["name"])) return;
    var {name,description,building,floor,halfFloor,room}=req.body;
    try{
        var loc=new Location({name,description,building,floor,halfFloor,room});
        var savedLocation=await loc.save();
        return res.validSend(200,{location:savedLocation})

    }
    catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}

/*      POST    /api/locations/all      */
export let allLocations=async(req,res)=>{
    try{
        var locList=await Location.find({status:0});
        return res.validSend(200,{locations:locList})
    }
    catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}

/*          POST /api/locations/all/name            */
export let allLocationsNames=async(req,res)=>{
    try{
        var locations= await Location.find({status:0}).select({name:1}).lean();
        return res.validSend(200,{locations});
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}