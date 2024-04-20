import mongoose from "mongoose"

const connectionUrl = "mongodb+srv://tanmaykhatri07726:a8s2QyxZgkUXgMQf@cluster0.3d6eral.mongodb.net/paytm"

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