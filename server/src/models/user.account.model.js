import {model, Schema} from "mongoose";


const accountSchema =  new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    balance:{
        type:Number,
        required:true
    }
    
})


export const Account = model("Account", accountSchema)