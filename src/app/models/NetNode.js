
var netNodeSchema=mongoose.Schema({
    patchPanelPort:{type:'string'},
    cabelNumber:{type:'string'},
    // switchName:{}
    switchId:{type:mongoose.SchemaTypes.ObjectId,ref:'Switch'},
    switchPort:{type:'string'},
    vlan:{type:mongoose.SchemaTypes.ObjectId,ref:'Vlan'},
    device:{type:mongoose.SchemaTypes.ObjectId,ref:'Device'}, //wifi,pc,inrow, accsess door, camera,server... pc is not in Device schema, so if this field is null, it means that it's a pc
    description:{type:'string'},
    location:{type:mongoose.SchemaTypes.ObjectId,ref:'location'},

})
netNodeSchema.plugin(mongooseTimestamp);

export default mongoose.model('NetNode',netNodeSchema)