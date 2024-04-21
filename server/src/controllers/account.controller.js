import mongoose from "mongoose";
import { Account } from "../models/user.account.model.js";
import { moneyTransferType } from "../utils/Types.js";

const checkBalance = async (req, res) => {

  const { _id } = req.user;

  const balance = await Account.findOne({
    userId: _id,
  });

  if (!balance) {
    return res.status(400).json({
      msg: "user don't have an account",
    });
  }
  return res.status(200).json({
    balance: balance.balance,
    msg: "User balance fetched successfully",
  });

};



const moneyTransfer =  async(req,res)=>{

    const session = await mongoose.startSession()

    session.startTransaction()

    const {_id} = req.user
    const inputData =  req.body

    console.log(inputData)

    const parsePayLoad = moneyTransferType.safeParse(inputData)

    console.log(parsePayLoad)

    if(!parsePayLoad.success){
        return res.status(400).json({
            msg:"Please enter valid input"
        })
    }

    const {to , amount} = parsePayLoad.data

    if(amount > 25000){
        await session.abortTransaction()
        return res.status(400).json({
            msg:"You can not transfer money above 25000"
        })
    }

    const fromAccount = await Account.findOne({userId:_id}).session(session)

    if(!fromAccount || fromAccount.balance < amount){
        await session.abortTransaction()
        return res.status(400).json({
            msg:"Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({userId:to}).session(session)

    if(!toAccount){
        await session.abortTransaction()
        return res.status(400).json({
            msg:"Invalid account"
        })
    }

    // perform the transition

    await Account.updateOne({userId:_id},{ $inc:{balance: -amount}}).session(session)
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session)

    //commit the transition
    await session.commitTransaction()

    return res.status(200).json({
        msg:"Transition completed"
    })
}


export {moneyTransfer, checkBalance };
