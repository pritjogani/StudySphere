const mongoose = require('mongoose');

// const URI = "mongodb://127.0.0.1:27017/mern_admin"
const URI = process.env.MONGODB_URI;

//const URI = "mongodb+srv://joganiprit2004:PRIt123@cluster0.d7nvkaa.mongodb.net/mern_Admin?retryWrites=true&w=majority&appName=Cluster0"

//here mern_admin is database name
//mongoose.connect(URI)
const connectdb = async () =>{
    try{
        
        await mongoose.connect(URI)

        console.log("database connection sucessful")

        
    } catch(error){

        console.error('database connection fail')
        process.exit(0)
    }
}

module.exports = connectdb;