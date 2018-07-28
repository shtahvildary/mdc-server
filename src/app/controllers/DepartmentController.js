import Department from '../models/Department'

/*      POST /api/departments/new     */
export let new_Department=async(req,res)=>{
    if(!req.validate(["name"])) return;
    var {name,description,locations,phones}=req.body;
    try{
        var dep=new Department({name,description,locations,phones});
        var savedDepartment=await dep.save();
        return res.validSend(200,{department:savedDepartment})
    }
    catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}

/*      POST    /api/departments/all      */
export let all_Departments=async(req,res)=>{
    try{
        var depList=await Department.find({status:0})
        .populate({path:"locations",select:["name","_id"]});

        var data=[];
        depList.map(n=>{
            var loc=[];
            var locId=[];
            var locName=[];
            
            n.locations.map(l=>{
                loc.push({_id:l._id,name:l.name})
                locId.push(l._id)
                locName.push(l.name)
            })
            console.log(n)
            data.push({
                _id:n._id,
                name:n.name,
                description:n.description,
                phones:n.phones,
                locations:loc,
                locationsName:locName,

                locationsId:locId
            })

        })
        var finalResult={
            columns:{
                name:"نام",
                description:"توضیحات",
                locationsName:"مکان",
                phone:"تلفن",
            },
            departmentsData:data
        }
        return res.validSend(200,{departments:finalResult})
    }
    catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}

/*          POST /api/departments/all/name            */
export let all_Departments_Names=async(req,res)=>{
    try{
        var departments= await Department.find({status:0}).select({name:1}).lean();
        return res.validSend(200,{departments});
    }catch(e){
        console.error(e);
        return res.validSend(500,{error:e});
    }
}