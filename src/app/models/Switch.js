
var switchSchema = mongoose.Schema({
  name:{type:'string'},
  ip:{type:'string'},
  description:{type:'string'},
  model:{type:'string'}, 
  diagramUrl:{type:'string'},
  location:{type:mongoose.SchemaTypes.ObjectId,ref:'location'},


});
switchSchema.plugin(mongooseTimestamp);

export default mongoose.model('Switch',switchSchema);

