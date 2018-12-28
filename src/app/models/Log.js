var logSchema=mongoose.Schema({
  status:{type:Number,default:0}, //0:active  , -1:deleted  
    name:{type:'string'},
    user:{type:mongoose.SchemaTypes.ObjectId,ref:'User'},
    model:{type:String},  //name of changed schema
    action:{type:{type:'string'},field:{type:'string'}},
  });
  logSchema.plugin(mongooseTimestamp);
export default mongoose.model('Log',logSchema);