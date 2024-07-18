const jwt = require('jsonwebtoken');
const User = require("../models/user_model")

const authMiddleware = async (req,res,next) =>{
    const token = req.header("Authorization");
    if(!token){ return res.status(401).json({msg:"token not provided"});
    }

    const jwtoken = token.replace("Bearer","").trim();
    console.log("token from auth middleware",jwtoken);
try {
  
    const isVerified = jwt.verify(jwtoken,process.env.JWT_SECTECT_KEY);
    console.log(isVerified);
    const userData = await User.findOne({email: isVerified.email}).select({
        password: 0
    });
    req.user = userData;
    req.token = token;
    req.userID = userData._id;
    console.log(userData);
} catch (error) {
    return res.status(401).json({message:"unauthorixed invalid token"}); 
}
    next();

}

module.exports = authMiddleware;