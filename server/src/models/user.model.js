import { model, Schema }  from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const SECRET = "secret"

const userSchema =  new Schema({
    username:{
        type:String,
        required:true,
        index:true,
        lowerCase:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        lowerCase:true,

    },
    password:{
        type:String,
        required:true,
        minLength:8,
    },
    refreshToken:{
        type:String
    }
})

userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()

    this.password =  await bcrypt.hash(this.password , 10)
    next()
})


userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password , this.password)    
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({_id:this._id},SECRET)
}



userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({_id:this._id},SECRET)
}

export const User = model("User", userSchema)