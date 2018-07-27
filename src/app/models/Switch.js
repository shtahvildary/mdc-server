
var switchSchema = mongoose.Schema({
  status:{type:Number,default:0}, //0:active  , -1:deleted  
  name:{type:'string'},
  ip:{type:'string'},
  description:{type:'string'},
  model:{type:'string'}, 
  diagramUrl:{type:'string'},
  rackroomId:{type:mongoose.SchemaTypes.ObjectId,ref:'Rackroom'},



});
switchSchema.plugin(mongooseTimestamp);

export default mongoose.model('Switch',switchSchema);

