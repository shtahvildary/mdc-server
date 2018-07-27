
var deviceTypeSchema = mongoose.Schema({
  status:{type:Number,default:0}, //0:active  , -1:deleted  
  name:{type:'string'}, //0:storage  , 1:wifi  , 2:inrow , 3:accsess door  , 4:camera  , 5:server
  description:{type:'string'},
  // specialProperties:[Object],// array of required fields for each device type, like config of PCs, channel for wifi ,...    *markModified*
  specialProperties:[{en:{type:'string'},fa:{type:'string'}}],// array of required fields for each device type, like config of PCs, channel for wifi ,...    *markModified*
});
deviceTypeSchema.plugin(mongooseTimestamp);

export default mongoose.model('DeviceType',deviceTypeSchema);

