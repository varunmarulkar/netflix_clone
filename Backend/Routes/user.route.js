import { getUsers, logout, signin, signup } from "../Controllers/user.controller.js";

export function userRoute(app){
    app.post("/api/signup",signup)
    app.post("/api/signin",signin)
    app.post("/api/logout",logout)
    app.get("/api/users",getUsers)
}