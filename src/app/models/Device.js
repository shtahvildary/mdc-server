
var deviceSchema = mongoose.Schema({
  name:{type:'string'},
  ip:{type:'string'},
  description:{type:'string'},
  deviceType:{type:'string'}, //0:storage  , 1:wifi  , 2:inrow , 3:accsess door  , 4:camera  , 5:server
  model:{type:'string'}, 
  vlan:{ type:mongoose.SchemaTypes.ObjectId, ref:"Vlan"},

  location:{type:mongoose.SchemaTypes.ObjectId,ref:'Location'},
  managementUrl:{type:'string'},
 
  //wifi:
  password:{type:'string'},
  channel:{type:'string'},

});
deviceSchema.plugin(mongooseTimestamp);

export default mongoose.model('Device',deviceSchema);

