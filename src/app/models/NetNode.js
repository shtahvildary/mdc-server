
var netNodeSchema=mongoose.Schema({
    patchPanelPort:{type:'string'},
    cableNumber:{type:'string'},
    // switchName:{}
    switchId:{type:mongoose.SchemaTypes.ObjectId,ref:'Switch'},
    switchPort:{type:'string'},
    vlan:{type:mongoose.SchemaTypes.ObjectId,ref:'Vlan'},
    device:{type:mongoose.SchemaTypes.ObjectId,ref:'Device'}, //wifi,pc,inrow, accsess door, camera,server,pc ... 
    description:{type:'string'},
    location:{type:mongoose.SchemaTypes.ObjectId,ref:'Location'},
  status:{type:Number,default:0}, //0:active  , -1:deleted  


})
netNodeSchema.plugin(mongooseTimestamp);

export default mongoose.model('NetNode',netNodeSchema)