var streamSchema=mongoose.Schema({
    status:{type:Number,default:0}, //0:active  , -1:deleted  
  name:{en:{type:'string'},fa:{type:'string'}},
  address:{type:String},
  playState:{type:Number,default:0}, //0:pause  ,   1:play
  streamServer:{type:String},//url address of streamserver
    });
    streamSchema.plugin(mongooseTimestamp);
  export default mongoose.model('Stream',streamSchema);