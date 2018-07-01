import Switch from '../models/Switch'

/*          POST /api/switches/new            */
export let newSwitch=async(req,res)=>{
    if(!req.validate(["name","model"]))return;
    var {name,ip,description,model,diagramUrl,location}=req.body;
    try{
        var sw=new Switch({name,ip,description,model,diagramUrl,location});
        var savedSW=await sw.save();
        return res.validSend(200,{switch:savedSW});

    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }

}

/*          POST /api/switches/all            */
export let allSwitches=async(req,res)=>{
    try{
        var swList= await Switch.find({})
        .populate({path:"location",select:"name"});
        var data=[];
        swList.map(n=>{
            data.push({
                name:n.name,
  ip:n.ip,
  description:n.description,
  model:n.model, 
  diagramUrl:n.diagramUrl,
  location:n.location.name,
  
            })
        })

        var finalResult={columns:{
            name:"نام",
            ip:"آدرس",
            description:"توضیحات",
            model:"مدل", 
            diagramUrl:"نمودار",
            location:"مکان",
          
        },
        switchesData:data
    }
        
        return res.validSend(200,{switches:finalResult});
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}
