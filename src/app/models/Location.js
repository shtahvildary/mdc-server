var locationSchema=mongoose.Schema({
  status:{type:Number,default:0}, //0:active  , -1:deleted  
  name:{type:'string'},
    description:{type:'string'},
    building:{type:'string'},
    // floor:{type:'string'},
    // halfFloor:{type:'string'},
    fHf:{type:'number'},//0:floor or 1:half floor
    level:{type:'number'},
    room:{type:'string'},
  });
locationSchema.plugin(mongooseTimestamp);
export default mongoose.model('Location',locationSchema);