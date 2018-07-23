
var vlanSchema = mongoose.Schema({
  number:{type:'string'},
  name:{type:'string'},
  ip:{type:'string'},
  description:{type:'string'},
  firstIp:{type:'string'}, 
  lastIp:{type:'string'}, 
  subnetMask:{type:'string'}, 
  status:{type:Number,default:0}, //0:active  , -1:deleted  
});
vlanSchema.plugin(mongooseTimestamp);

export default mongoose.model('Vlan',vlanSchema);

