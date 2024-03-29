const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protectRoute = async(req,res,next) =>{
    try {
        const token=req.headers.authorization

        if(!token){
            return res.status(401).json({message: 'Unauthorized'})
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findById(decoded.userId).select('-password')  //get userId from the payload in generateTokenAndCookie func

        req.user=user;
        next();
    } catch (err) {
        res.status(500).json({message: err.message})
        console.log("Error in protectRoute: ", err.message)
    }
}

module.exports = protectRoute