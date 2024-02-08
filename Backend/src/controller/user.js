import userModel from "../model/user.js";
import jwt from 'jsonwebtoken';

const generateToken = (user) => {
    return jwt.sign({
        data: user
    }, process.env.SECRET_KEY, {expiresIn: process.env.EXPIRE_IN});
};

export const Signup = async ( req,res ) => {
    try {
        const {name,email,password} = req.body;
        const user = await userModel.create({name,email,password});
        return res.status(201).json({message: "User created Successfully",user: user});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}

export const Login = async ( req,res ) => {
    try {
        const {email,password} = req.body;
        const user = await userModel.findOne({email: email});
        if(!user){
            return res.status(404).json({message: "Email doesn't exists"});
        }
        if(user.password != password){
            return res.status(400).json({message: "Invalid password"});
        }
        const token = generateToken(user);
        return res.status(200).json({message: "Login Successfully",token: token,user: user});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error"});
    }
}