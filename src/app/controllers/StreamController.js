import Stream from '../models/Stream'

/*      POST /api/streams/new     */
export let new_Stream=async(req,res)=>{
    if(!req.validate(["name"])) return;
    var {name,address}=req.body;
    try{
        var str=new Stream({name,address});
        var savedStream=await str.save();
        return res.validSend(200,{stream:savedStream})
    }
    catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}

/*      POST    /api/streams/all      */
export let all_Streams=async(req,res)=>{
    try{
        var strList=await Stream.find({status:0})
        

        var data=[];
        var playState="";
        strList.map(n=>{
            console.plain('n.name: ',n.name)
            if(n.playState==0) playState="متوقف شده"
            else playState="در حال پخش"
            data.push({
                _id:n._id,
                nameEn:n.name.en,
                nameFa:n.name.fa,
                address:n.address,
                playState:playState,
                
            })

            console.plain("data......",data)
        })

        var finalResult={
            columns:{
                nameFa:"نام فارسی",
                nameEn:"نام انگلیسی",
                address:"آدرس",
                playState:"وضعیت",
                
            },
            streamsData:data
        }
        console.plain("finalResult......",finalResult.streamsData[0].name)

        return res.validSend(200,{streams:finalResult})
    }
    catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}

