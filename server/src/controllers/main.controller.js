import { User } from "../models/user.model.js"

const getUsers = async(req,res)=>{
    const filter =  req.query.filter || " "


    const users = await User.find({
        username:{
            $regex:filter
        }
    }).select("-password -refreshToken")

    return res.status(200).json({
        users,
    })
}


export {
    getUsers
}