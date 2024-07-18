import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";


export const Register = () =>{
    const {storeTokenInLS} = useAuth();
    const [user,setuser] =useState({
        username:"",
        email:"",
        phone:"",
        password:"",
    });

    //for navigate
    const navigate = useNavigate()

    // handling the input value
    const handleinput = (e) =>{
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setuser({
            ...user,
            [name]:value
        })
    }

    //handling form for submission
const handlesubmit = async (e) =>{
    e.preventDefault();
    console.log(user);
   

   try {
    const responce = await fetch(`http://localhost:5000/api/auth/register`,{method:"POST"
        ,headers:{
            "Content-Type": "application/json"

        },
        body:JSON.stringify(user)
    })
    // console.log(responce);
    const res_data = await responce.json();
    
    if(responce.ok){

        
        storeTokenInLS(res_data.token)
       // localStorage.setItem("token",res_data.token)
        setuser({
            username:"",
            email:"",
            phone:"",
            password:"",
        })
        toast.success("registrarion successfull")
        navigate('/');
    }
    else{
        toast.error(res_data.extradetails ? res_data.extradetails : res_data.message);
    }
    
   } catch (error) {
console.log(error);
   }
    
    }


    return <>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols">
                        <div className="registration-image">
                            <img src="/images/login.png" alt=""  width="400" height="500" />
                        </div>

                        {/* let takel registration form */}
                        <div className="registraion-form">
                           <h1 className="main-heading mb-3">registraion form</h1>
                           <br />
                           <form onSubmit={handlesubmit} action="
                           ">
                            <div>
                                <label htmlFor="username">username</label>
                                <br />
                                <input type="text" name="username"  placeholder="username" id="username" required autoComplete="off" value={user.username} onChange={handleinput}/>
<br />
                                <label htmlFor="email">email</label>
                                <br />
                                <input type="email" name="email"  placeholder="enter your email" id="email" required autoComplete="off" value={user.email} onChange={handleinput} />
<br />
                                <label htmlFor="phone">phone</label>
                                <br />
                                <input type="number" name="phone"  placeholder="enter phone no" id="phone" required autoComplete="off" value={user.phone} onChange={handleinput} />
<br />
                                <label htmlFor="password">password</label>
                                <br />
                                <input type="password" name="password"  placeholder="enter password" id="password" required autoComplete="off" value={user.password} onChange={handleinput}/>
                            </div>
                            <br />
                            <button type="submit" className="btn btn-submit">Register Now</button>
                           </form>
                        </div>

                    </div>
                </div>
            </main>
        </section>
    </>
};
