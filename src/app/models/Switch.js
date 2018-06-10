
var switchSchema = mongoose.Schema({
  name:{type:'string'},
  ip:{type:'string'},
  description:{type:'string'},
  model:{type:'string'}, 
 

});
switchSchema.plugin(mongooseTimestamp);

export default mongoose.model('Switch',switchSchema);

