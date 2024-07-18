import { useState } from "react";
import { useAuth } from "../store/auth";

const defaultcontectform = {
    username: "",
    email:"",
    message:""
}
export const Contact = () =>{

    const [contact , setcontact] = useState(defaultcontectform)
    const [userData, setUserData ] = useState(true);

    const {user} = useAuth();

    if(userData && user)
        { setcontact({
            username: user.username,
            email: user.email,
            message:""

        })
        setUserData(false);
    }

const handlereq = (e) =>{
    const name = e.target.name;
    const value = e.target.value;
    setcontact({
        ...contact , [name] : value
    }
    
    )

}

const fun = async (e) =>{
    e.preventDefault();
     console.log("data is",contact);
    // console.log(user);
   try {
    const responce = await fetch("http://localhost:5000/api/form/contact",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(contact)
    })
    if(responce.ok){
        setcontact(defaultcontectform);
        const data = await responce.json();
        console.log(data);
        alert("message send successfully")
    }
    
   } catch (error) {
        console.log("invalid details")
   }

}


    return <>
   <div>
    <div className="section-contact container grid grid-two-cols">
 
        <div className="hero-img">
            <img src="./images/login.png" alt=""  width="70%" height="50"/>
        </div>
        <div className="form-part">
            <div className=" text-5xl mb-20 text-cyan-50 ">
                Contact now 
            </div>
            <form action="
            " onSubmit={fun}>
                <label htmlFor="username" className="text-4xl mb-6 mr-5" >username:</label>
                <input type="text" className="mb-7" name="username" placeholder="enter username" required id="username" value={contact.username} onChange={handlereq}/>
                <br />

                <label htmlFor="email" className="text-4xl mb-6 mr-24">email:</label>
                <input type="email" className="mb-7" name="email" placeholder="enter email" required id="email" value={contact.email} onChange={handlereq}  />
                <br />
                <label htmlFor="textarea" className="text-4xl  mr-10 ">message:</label>
                <textarea name="message"   id="message" placeholder="enter message" required  value={contact.message} onChange={handlereq} ></textarea>
                    <br />
                <button type="submit" className="btn mt-20">
                       submit
                </button>

            </form>
        </div>
    </div>
    </div>
    </>
};
