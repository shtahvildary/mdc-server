var locationSchema=mongoose.Schema({
    name:{type:'string'},
    description:{type:'string'}
});
locationSchema.plugin(mongooseTimestamp);
export default mongoose.model('Location',locationSchema);