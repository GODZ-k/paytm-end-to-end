import mongoose from "mongoose"

const connectionUrl = "mongodb+srv://tanmay:JxeWoxyj5lupYhKM@cluster0.theurha.mongodb.net/paytm"

export default async function connectDb(){
    await mongoose.connect(connectionUrl)
    .then((res)=>{
        console.log(`Database is connected on host : ${res.connection.host}`)
    })
    .catch((err)=> {
        console.log(`error is connecting database : ${err}`)
        process.exit(1)
    })
}