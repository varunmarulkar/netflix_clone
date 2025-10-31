import dotenv from "dotenv"
import express from "express"
import { Db } from "./Db.js"
import { userRoute } from "./Routes/user.route.js"
import cookieParser from "cookie-parser"
import cors from "cors"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 7000

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin:process.env.CLIENT_URL,credentials:true
}))

userRoute(app)

app.get("/", (req, res) => {
    res.send("hello world")
})


app.listen(PORT,()=>{
    console.log(`server is connected on ${PORT}`)
})

Db()


