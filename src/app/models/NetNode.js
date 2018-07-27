
var netNodeSchema=mongoose.Schema({
  status:{type:Number,default:0}, //0:active  , -1:deleted  
    patchPanelPort:{type:'string'},
    cableNumber:{type:'string'},
    // switchName:{}
    switchId:{type:mongoose.SchemaTypes.ObjectId,ref:'Switch'},
    switchPort:{type:'string'},
    vlanId:{type:mongoose.SchemaTypes.ObjectId,ref:'Vlan'},
    deviceId:{type:mongoose.SchemaTypes.ObjectId,ref:'Device'}, //wifi,pc,inrow, accsess door, camera,server,pc ... 
    description:{type:'string'},
    locationId:{type:mongoose.SchemaTypes.ObjectId,ref:'Location'},
    rackroomId:{type:mongoose.SchemaTypes.ObjectId,ref:'Rackroom'},


})
netNodeSchema.plugin(mongooseTimestamp);

export default mongoose.model('NetNode',netNodeSchema)