
var deviceTypeSchema = mongoose.Schema({
  name:{type:'string'}, //0:storage  , 1:wifi  , 2:inrow , 3:accsess door  , 4:camera  , 5:server
  description:{type:'string'},
  status:{type:Number,default:0}, //0:active  , -1:deleted  

});
deviceTypeSchema.plugin(mongooseTimestamp);

export default mongoose.model('DeviceType',deviceTypeSchema);

