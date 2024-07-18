require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const authRoute = require("./router/auth-router")
const contactForm  = require("./router/contact-router") 
const connectdb = require("./utils/db");
const errorMiddleware = require('./middlewares/error-middleware');
const services = require('./controllers/service-controller');
const serviceRoute = require("./router/service-router")
const adminroute = require("./router/admin-router")
//middleware

// const corsOptions = {
//     origin: "http://localhost:5173/",
//     methods:"GET,POST,PUT,DELETE,PATCH,HEAD"
//   }


app.use(cors());
app.use(express.json());


//mount event
app.use('/api/auth',authRoute)
app.use("/api/form" ,contactForm)
app.use("/api/data",serviceRoute)

//let s define admin root
app.use("/api/admin",adminroute)
 


app.use(errorMiddleware);

 




connectdb().then(() =>{

const port = 5000;
app.listen(port,() =>{
    console.log(`server is running ${port}`)
})
})