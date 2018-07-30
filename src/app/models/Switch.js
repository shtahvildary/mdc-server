
var switchSchema = mongoose.Schema({
  status:{type:Number,default:0}, //0:active  , -1:deleted  
  name:{type:'string'},
  ip:{type:'string'},
  description:{type:'string'},
  model:{type:'string'}, 
  diagramUrl:{type:'string'},
  // rackroom:{type:mongoose.SchemaTypes.ObjectId,ref:'Rackroom'},
  location:{type:mongoose.SchemaTypes.ObjectId,ref:'Location'},



});
switchSchema.plugin(mongooseTimestamp);

export default mongoose.model('Switch',switchSchema);

