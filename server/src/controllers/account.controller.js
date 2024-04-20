import { Account } from "../models/user.account.model.js"



const checkBalance = async(req,res)=>{
const {_id}= req.user

const balance = await Account.findOne({
    userId:_id
})

if(!balance){
    return res.status(200).json({
        msg:"user don't have an account"
    })
}
return res.status(200).json({
    balance:balance,
    msg:"User balance fetched successfully"
})
}


export {
    checkBalance
}