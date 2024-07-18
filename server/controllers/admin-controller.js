const User = require("../models/user_model")
const Contact = require("../models/contact-model")

const getAllusers = async (req,res) =>{
    try {
        const users = await User.find({},{password:0});
        console.log(users)
        
        if(!users || users.length === 0)
            return res.status(404).json({message:"no users found"})
        
        return res.status(200).json(users);
      


    } catch (error) {
        next(error);
     

    } 
}


const getAllContacts = async (req,res) =>{
try {
    const contact = await Contact.find();
  if(!contact || contact.length === 0)
    return res.status(404).json({message :"no contacts found"})

  return res.status(200).json(contact)
    
} catch (error) {
   next(error);
}

}

//single user logic
const getsingleuserbyId = async (req,res) =>{
    try {
        const id = req.params.id;
      const data =  await User.findOne({_id:id} ,{password:0});
        return res.status(200).json(data);
    
    } catch (error) {
        next(error);
    }
    }

//user delete logic
const deleteuserbyId = async (req,res) =>{
try {
    const id = req.params.id;
    await User.deleteOne({_id:id});
    return res.status(200).json({message:"User deleted successfully"})

} catch (error) {
    next(error);
}
}

//user update logic
const updateuserbyId = async (req,res) =>{
    try {
        const id = req.params.id;
        const updateduserdata = req.body;
        const updateuser = await User.updateOne({_id:id},{$set: updateduserdata});
        return res.status(200).json(updateuser)

    } catch (error) {
        next(error);
    }
}

const deletecontactbyId = async (req,res) =>{
    try {
        const id = req.params.id;
        await Contact.deleteOne({_id:id});
        return res.status(200).json({message:"contact deleted successfully"})
    
    } catch (error) {
        next(error);
    }
    }
    




module.exports = {getAllusers, getAllContacts,deleteuserbyId,getsingleuserbyId,updateuserbyId,deletecontactbyId};