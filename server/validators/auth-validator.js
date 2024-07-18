const { z } = require("zod")

//creating login schema
const loginSchema = z.object({
    email:z
    .string({required_error:"email is required"}).trim()
    .email({message:"invalid email address"})
    .min(3,{message:"email must be at least of 3 chars"})
    .max(255,{message:"name must not be more than 255 characters"}), 

    password:z
    .string({required_error:"password is required"}).trim()
    .min(6,{message:"password must be at least of 6 chars"})
    .max(1024,{message:"password must not be more than 1024 characters"}),


})

//creating an object schema
const signupSchema = loginSchema.extend({
    username:z
    .string({required_error:"Name is required"}).trim()
    .min(3,{message:"name must be at least of 3 chars"})
    .max(255,{message:"name must not be more than 255 characters"}),

   
    phone:z
    .string({required_error:"phone no is required"}).trim()
    .min(10,{message:"phone no must be at least of 10 chars"})
    .max(20,{message:"phone must not be more than 20 characters"}),

   
})


module.exports = {signupSchema,loginSchema};