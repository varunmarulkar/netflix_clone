import mongoose from "mongoose"

export function Db(){
    mongoose.connect(process.env.DB_CONNECT)
    .then(() => {
        console.log("database is connected successfully")
    }).catch(() => {
        console.log("database is not connected successfully")
    })
}
