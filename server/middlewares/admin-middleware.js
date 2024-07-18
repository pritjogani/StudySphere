const adminMiddleware = async (req,res,next) =>
{
    try {
        console.log(req.user)
        const adminRole = req.user.isAdmin;
        //req.status(200).json({msg:req.user.isAdmin})
        if(!adminRole)
            {
                 
                return res.status(403).json({message:"Acess denied. User is not an  admin"})

            }
            //if user is an admin procced to the next middleware
            //next method goes to next function
        next();


        
    } catch (error) {
       next(error); 
        
    }
}

module.exports = adminMiddleware;