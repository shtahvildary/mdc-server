import Link from '../models/Link';

/*      POST    /api/links/new      */
export let newLink=async(req,res)=>{
    if(!req.validate(["url"])) return;
    var{name,url,description}=req.body;
    try
   { var lnk=new Link({name,url,description});
    var link=await devicePixelRatio.save();
    return res.validSend(200,{link})}
    catch(e){
        console.error(e);
        return  res.validSend(500,{error:e})
    }
}

/*      POST    /api/links/all      */
export let allLinks=async(req,res)=>{
    try{
        var links=await Link.find({});
        return res.validSend(200,{links})
    }
    catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}