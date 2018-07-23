
var linkSchema = mongoose.Schema({  //external links Sadra , ...
  name:{type:'string'},
  url:{type:'string'},
  description:{type:'string'},
  status:{type:Number,default:0}, //0:active  , -1:deleted  
  
   
});
diagramSchema.plugin(mongooseTimestamp);

export default mongoose.model('Link',linkSchema);

