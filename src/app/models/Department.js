var departmentSchema=mongoose.Schema({
  status:{type:Number,default:0}, //0:active  , -1:deleted  
    name:{type:'string'},
    description:{type:'string'},
    locations:[{type:mongoose.SchemaTypes.ObjectId,ref:'Location'}],
    phones:[{type:String}],
  });
  departmentSchema.plugin(mongooseTimestamp);
export default mongoose.model('Department',departmentSchema);