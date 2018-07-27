
var computerSchema = mongoose.Schema({
  status:{type:Number,default:0}, //0:active  , -1:deleted  
  name:{type:'string'},
  ip:{type:'string'},
  description:{type:'string'},
  //confi:
  mainboard:{type:'string'},
  ram:{type:'string'},
  vga:{type:'string'},
  hdd:{type:'string'},
  os:{type:'string'},

  dateOfRepair:{type:Date,default:Date.now},
  locationId:{type:mongoose.SchemaTypes.ObjectId,ref:'Location'},
  departmentId:{type:mongoose.SchemaTypes.ObjectId,ref:'Department'},

  // rackroomId:{type:mongoose.SchemaTypes.ObjectId,ref:'Rackroom'},



});
computerSchema.plugin(mongooseTimestamp);

export default mongoose.model('Computer',computerSchema);

