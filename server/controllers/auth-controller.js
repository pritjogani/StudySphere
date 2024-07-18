//we only write login in this app
const User = require("../models/user_model")
const bcrypt = require('bcrypt')
const home = async (req,res) =>{
    try{
        res.status(200).send('welcome to my channel using router')
    }catch(error){

console.log(error);

    }
}

const register = async (req,res) =>{
    try{
        
        const {username,email,phone,password} = req.body;
        //console.log(req.body);

        const userExist = await User.findOne({email: email});


        if(userExist){
            return res.status(400).json({message:"email already exist"})
        }
        //hash the password

      //  const saltround = 10;
       // const hash_password = await bcrypt.hash(password,saltround);
    const usercreated =  await User.create({username,email,phone,password})
    console.log(usercreated);

        res.status(200).json({message: "registration succesfull", token: await usercreated.generateToken(), userID:usercreated._id.toString(),})
    }catch(error){

console.log(error);
    }
}



const login = async (req,res) =>{
    try {

        const {email,password} = req.body;
      

        const userExist = await User.findOne({email})
        console.log(userExist);
        if(!userExist)
            {
                return res.status(400).json({message:"invaild credentials"})
            }

            //const user = await bcrypt.compare(password,userExist.password) 
            const user = await userExist.comparePassword(password);
            console.log(user)
            if(user){
                res.status(200).json({message: "login sucessful", token: await userExist.generateToken(), userID: userExist._id.toString(),})
                console.log("login successful")

            }else{
                res.status(401).json({message:"invaild email or password"})

            }
            }
     catch (error) {
        res.status(500).json("internal server error")
    }
}

//user logic to send user data
const user = async (req,res) =>{
    try{
        
        const userData = req.user;
         console.log(userData)
         return res.status(200).json({userData})
       // res.status(200).json({msg:"hi prit"})
    }catch(error){
        console.log(`error from the user route ${error}`)
    }
}




// const datashow = async (req,res) =>{

//     const {username,email,phone,password} = req.body;
//     res.json({username,email,phone,password})
// }
module.exports = { register,home,login,user};