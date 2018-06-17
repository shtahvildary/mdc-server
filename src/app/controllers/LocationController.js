import Location from '../models/Location'

/*      POST /api/locations/new     */
export let newLocation=async(req,res)=>{
    if(!req.validate(["name"])) return;
    var {name,description}=req.body;
    try{
        var loc=new Location({name,description});
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
        var locList=await Location.find({});
        return res.validSend(200,{locations:locList})
    }
    catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}