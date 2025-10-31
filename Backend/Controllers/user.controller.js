import UserModel from "../Models/User.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export async function signup(req, res) {
    const { username, email, password } = req.body

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }

        const emailExist = await UserModel.findOne({ email })
        if (emailExist) {
            return res.status(400).json({ message: "Email is already exist" })
        }

        const usernameExist = await UserModel.findOne({ username })
        if (usernameExist) {
            return res.status(400).json({ message: "Username is already taken,try another one" })
        }

        const hashedPassword = bcrypt.hashSync(password, 10)

        const newUser = await UserModel.create({ username, email, password: hashedPassword })

        if (newUser) {
            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
                expiresIn: "7d"
            })

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            })
        }
        res.status(200).json({ user: newUser, message: "User created successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export async function signin(req, res) {
    const { username, password } = req.body

    try {
        const user = await UserModel.findOne({ username })

        if (!user) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid Credentials" })
        }

        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "7d"
            })

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict"
            })
        }

        res.status(200).json({ user: user, message: "Logged in successfully" })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


export async function getUsers(req, res) {

    const { token } = req.cookies

    if (!token) {
        return res.status(401).json({ message: "No token provided" })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid Token" })
        }

        const user =await UserModel.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(400).json({ message: "No user found." })
        }


        res.status(200).json({ user:user})
    } catch (error) {
          console.log("error in fetching user")
          res.status(500).json({message:error.message})
    }
}


export async function logout(req,res){
    res.clearCookie("token")
    res.status(200).json({message:"Logged out successfully"})
}