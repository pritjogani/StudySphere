import { useState } from "react";
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const Login = () =>{
    const [user,setuser] =useState({
        email:"",
        password:"",
    });
    const navigate = useNavigate();
const {storeTokenInLS} = useAuth();


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
    //we write code for connect backend
const handlesubmit = async (e) =>{
    e.preventDefault();
    console.log(user);
    try {
        const responce = await fetch(`http://localhost:5000/api/auth/login`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
    
        })
        console.log(responce);
        const res_data = await responce.json();
        if(responce.ok){
           
            console.log(`res from server`, res_data)
            storeTokenInLS(res_data.token); 
         //  localStorage.setItem("token",res_data.token)
            setuser({
                email:"",
                password:"",
            })
            toast.success("login sucessful");
            navigate('/');
        }
        else
        {
            toast.error(res_data.extradetails ? res_data.extradetails : res_data.message)
        }
        
    } catch (error) {
        console.log("invalide details")
        alert("invaild details");
        console.log(error)
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
                        <div className="login-form">
                           <h1 className="main-heading mb-3">Login form</h1>
                           <br />
                           <form onSubmit={handlesubmit} action="
                           ">
                            <div>
                                <label htmlFor="email">email:</label>
                                <input type="text" name="email"  placeholder="email" id="email" required autoComplete="off" value={user.username} onChange={handleinput}/>
<br />
                                <label htmlFor="password">password</label>
                                <input type="password" name="password"  placeholder="enter password" id="password" required autoComplete="off" value={user.password} onChange={handleinput}/>
                            </div>
                            <br />
                            <button type="submit" className="btn btn-submit">login</button>
                           </form>
                        </div>

                    </div>
                </div>
            </main>
        </section>
    </>
};
