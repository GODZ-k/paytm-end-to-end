import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
const app  = express()

app.use(cors())
app.use(cookieParser())
app.use(express.json())


// routes 

import mainRoute from "./router/main.route.js"

app.use("/api/v1" , mainRoute)

export default app