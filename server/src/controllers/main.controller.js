const getMessage = async(req,res)=>{
    return res.status(200).json({
        msg:"hello this is main route "
    })
}

export {
    getMessage
}