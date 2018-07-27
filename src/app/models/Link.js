
var linkSchema = mongoose.Schema({  //external links Sadra , ...
  status:{type:Number,default:0}, //0:active  , -1:deleted  
  name:{type:'string'},
  url:{type:'string'},
  description:{type:'string'},
  
   
});
diagramSchema.plugin(mongooseTimestamp);

export default mongoose.model('Link',linkSchema);

