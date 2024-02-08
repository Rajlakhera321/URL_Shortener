import jwt from "jsonwebtoken";

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers.authorization
        const {data} = await jwt.verify(token, process.env.SECRET_KEY)
        req.userData = data
        next()
    } catch (error) {
        console.log("erorr toekn")
        return res.status(400).json({message: "Invalid Token"})
    }
}

export default {verifyToken};