//schema = blueprint of stucture 
//model: as a higher leverl abstraction that interacts with the database based on the defined schema
const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }

    
})
//secure password with bycript
//its work on middleware
userSchema.pre('save',async function(){


const Userss = this;
if(!Userss.isModified("password"))
    {
        next();

    }
    try{
        const saltRound = await bcrypt.genSalt(10)
        const hash_password = await bcrypt.hash(Userss.password,saltRound)
        Userss.password = hash_password;

    }
    catch(error)
    {
        next(error);
    }
   
})

//json web token
//instance methods
userSchema.methods.generateToken = async function() { 
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,

        },
        process.env.JWT_SECTECT_KEY,{
            expiresIn: "30d",
        }
    )
    } catch (error) {
        console.log(error);
    }

};

//compare password
userSchema.methods.comparePassword = async function(password){
    return  bcrypt.compare(password,this.password)
}

//define model or collection name
const User = new mongoose.model("User", userSchema);
module.exports = User;
