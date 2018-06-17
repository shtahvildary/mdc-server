
var linkSchema = mongoose.Schema({  //external links Sadra , ...
  name:{type:'string'},
  url:{type:'string'},
  description:{type:'string'},
  
   
});
diagramSchema.plugin(mongooseTimestamp);

export default mongoose.model('Link',linkSchema);

