import { User } from "../models/userModel.js";
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const Login = async (req, res) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(401).json({ message: "Invalid Data", success: "false" })
        }

        const user = await User.findOne({ email })

        if (!user) {
            return res.status(401).json({ message: "Invalid email/password", success: 'false' })
        }

        const isMatch = await bcryptjs.compare(password, user.password); // to compare the frontend password with hashed database password .... .compare return bool value

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email/password", success: 'false' })
        }

        const tokenData = {
            id: user._id
        }

        const token = await jwt.sign(tokenData, "dfbvgserfsf", { expiresIn: "1d" }); //V.V.Imp

        return res.status(200).cookie("token", token, { httpOnly: true }).json({
            //.cookie(name of the cookie, data of cookie, cookie only accessible via HTTPS requests)

            message: `Welcome back ${user.fullName}`,
            user,
            success: true

        })

    } catch (error) {
        console.log(error);
    }

}


export const Logout = async (req, res) => {
    res.status(200).cookie("token", "", { expiresIn: new Date(Date.now()), httpOnly: true }).json({
        message: 'User loggedOut successfully',
        success: true
    })
}




export const Register = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        if (!fullName || !password || !email) {
            return res.status(401).json({ message: "Invalid Data", success: "false" });
        }

        const user = await User.findOne({ email })

        if (user) {
            return res.status(401).json({ message: "This email is already in use", success: false })
        }

        const hashedPassword = await bcryptjs.hash(password, 16);

        //if user already nhi hai then create krenge user
        await User.create({
            fullName,
            email,
            password: hashedPassword
        })

        return res.status(201).json({ message: "Account created successfully", 
            success : true
         })

    } catch (error) {

        console.log(error);

    }
}