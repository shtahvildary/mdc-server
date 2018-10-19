var rackroomSchema = mongoose.Schema({
  status: { type: Number, default: 0 }, //0:active  , -1:deleted
  name: { type: "string" },
  description: { type: "string" }
});
rackroomSchema.plugin(mongooseTimestamp);
export default mongoose.model("Rackroom", rackroomSchema);
