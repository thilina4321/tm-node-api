const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const bcrtpt = require('bcryptjs')
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
  email: {
    type: String,
    unique:true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Not a valid email");
      }
    },
    required:true,
  },
  age: { type: Number },
  password: {
    type: String,
    required: true,
    minlength:7,
    
  },
  tokens:[{
    token:{
      type:String,
      required:true
    }
  }]
},{
  timestamps:true
});


UserSchema.virtual('tasks', {
  ref:'Task',
  localField:'_id',
  foreignField:'owner'
})

UserSchema.statics.findByEmailAndPassword = async(email,password)=>{
  const user = await User.findOne({email})
  if(!user){
    throw new Error('can\'t find user for this email')
  }
  let isMatch;
  if(password){
    isMatch = await bcrtpt.compare(password, user.password) 

  }
  if(!isMatch){
    throw new Error('Unable to login')
  }
  return user
}

UserSchema.methods.toJSON = function(){
  const user = this
  console.log(user);
  const userData = user.toObject()
  console.log(userData);

  delete userData.password
  delete userData.tokens


  return userData
}

UserSchema.methods.generateJWToken = async function(){
  const user = this
  const token = jwt.sign({id:user._id.toString()}, process.env.JWT_SECRET)
  user.tokens = user.tokens.concat({token})
  console.log('before');
  await user.save()
  console.log('after');

  return token
}

const User = mongoose.model("User", UserSchema);

module.exports = User

// rnc1945mdI3pRyab