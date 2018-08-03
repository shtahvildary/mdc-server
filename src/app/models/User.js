/**
 *          .::USER MODEL::.
 * User Mongoose model
 * 
 */
import Hash from './sensitive/Hash';
import { isNumber } from 'util';


var userSchema = mongoose.Schema({
	status:{type:Number,default:0}, //0:active  , -1:deleted  
	fName: {
		type: String,
		
	},lName: {
		type: String,
		
	},username: {
		type: String,
		required: true
	},
	userType:{type:Number},	//0:zAdmin	, 1:Admin	,	2:User
permissions:[{type:Number}],
});

userSchema.plugin(mongooseTimestamp);
//UPDATING HASH WHEN PASSWORD IS CHANGED
userSchema.virtual('password').set(async function(password){
	return await Hash.update({user:this._id},{user:this._id,hash:password},{upsert:true});
})

//AUTHORIZE USER
userSchema.statics.authorize= function(user){
	return new Promise(async function(resolve,reject){
		try{
			//FINDING HASH
			var savedHash=await Hash.findOne({user:user._id});
			if(!savedHash) return reject("hash was not found");

			//COMPARING PASSWORD AND HASH
			var match=await bcrypt.compare(user.password,savedHash.hash);
			if(match) return resolve(true);
			return resolve(false);
		}catch(e){
			return reject(e);
		}

	})
}



export default mongoose.model('User', userSchema);