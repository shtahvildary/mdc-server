
var deviceSchema = mongoose.Schema({
  status:{type:Number,default:0}, //0:active  , -1:deleted  
  name:{type:'string'},
  ip:{type:'string'},
  description:{type:'string'},
  deviceType:{type:mongoose.SchemaTypes.ObjectId,ref:'DeviceType'},
  model:{type:'string'}, 
  code:{type:'string'}, //شماره اموال
  // vlan:{ type:mongoose.SchemaTypes.ObjectId, ref:"Vlan"},

  // location:{type:mongoose.SchemaTypes.ObjectId,ref:'Location'},
  managementUrl:{type:'string'},
  department:{type:mongoose.SchemaTypes.ObjectId,ref:'Department'},



  specialProperties:[{name:String,value:String}], // array of required fields for each device type, like config of PCs, channel for wifi ,...    *markModified*
 
  // //wifi:
  // password:{type:'string'},
  // channel:{type:'string'},

  // //todo: add pc config 

});
deviceSchema.plugin(mongooseTimestamp);

export default mongoose.model('Device',deviceSchema);

