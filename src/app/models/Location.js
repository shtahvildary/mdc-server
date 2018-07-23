var locationSchema=mongoose.Schema({
    name:{type:'string'},
    description:{type:'string'},
  status:{type:Number,default:0}, //0:active  , -1:deleted  

});
locationSchema.plugin(mongooseTimestamp);
export default mongoose.model('Location',locationSchema);