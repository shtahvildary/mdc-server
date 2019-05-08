var streamSchema = mongoose.Schema({
  status: { type: Number, default: 0 }, //0:active  , -1:deleted
  name: { en: { type: "string" }, fa: { type: "string" } },
  playState: { type: Number, default: 0 }, //0:pause  ,   1:play
  changeStateTime:{type:Date},
  streamServer: { type: String }, //url address of streamserver
  address: { type: String },

  isMosaic: { type: Number, default: 0 }, //0:no  , 1:yes=> it is mosaic
  mosaicInputs: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Stream" }], //just for mosaic
  mosaicDimensions:{x:{type:Number, default: 0},y:{type:Number, default: 0}} //just for mosaic
});
streamSchema.plugin(mongooseTimestamp);
export default mongoose.model("Stream", streamSchema);
