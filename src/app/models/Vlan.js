
var vlanSchema = mongoose.Schema({
  number:{type:'string'},
  name:{type:'string'},
  ip:{type:'string'},
  description:{type:'string'},
  firstIp:{type:'string'}, 
  lastIp:{type:'string'}, 
  subnetMask:{type:'string'}, 
});
vlanSchema.plugin(mongooseTimestamp);

export default mongoose.model('Vlan',vlanSchema);

