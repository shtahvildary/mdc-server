
var vlanSchema = mongoose.Schema({
  status:{type:Number,default:0}, //0:active  , -1:deleted  
  name:{type:'string'},
  number:{type:'string'},
  ip:{type:'string'},
  firstIp:{type:'string'}, 
  lastIp:{type:'string'}, 
  subnetMask:{type:'string'}, 
  diagramUrl:{type:'string'},
  description:{type:'string'},
});
vlanSchema.plugin(mongooseTimestamp);

export default mongoose.model('Vlan',vlanSchema);

