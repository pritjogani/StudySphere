import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";




export const Adminupdate = () =>{
    const params = useParams();
const {authorizationtoken} = useAuth();
    // const params = useParams();
  //  const {authorization} = useAuth();
    const [data,setData] =useState({
        username:"",
        email:"",
        phone:""
    });
    const getsingleuserdata = async () =>{
        try {
         const responce = await fetch(`http://localhost:5000/api/admin/users/${params.id}`,{method:"GET"
             ,headers:{
                
                 Authorization: authorizationtoken,
     
             },
        
         })
         // console.log(responce);
         const data = await responce.json();
      setData(data);         
        } catch (error) {
     console.log(error);
        }
         
         }
    //for navigate
    const navigate = useNavigate();

    //handling the input value
    const handleinput = (e) =>{
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setData({
            ...data,
            [name]:value
        })
    }

  
   

      //handle input from backend fetch
      useEffect ( () =>{
        getsingleuserdata();
    },[])

//update data dynamically
const handlesubmit = async(e) =>{
e.preventDefault();
try {
    const responce = await fetch(`http://localhost:5000/api/admin/users/update/${params.id}`,{
            method:"PATCH",
            headers:{
                 "Content-Type": "application/json",
                Authorization: authorizationtoken,
            },
            body:JSON.stringify(data),

        })
        if(responce.ok)
            {  toast.success("updated successfully")
navigate("/admin/users")
            }
            else{
                toast.error("not upasdated ")
            }
  
} catch (error) {
    console.log(error)
}
}


    return <>
        <section>
            <main>
                <div className="section-update">
                    <div className="container grid ">
                     
                        {/* let takel registration form */}
                        <div className="update-form">
                           <h1 className="main-heading mb-3">update form form</h1>
                           <br />
                           <form onSubmit={handlesubmit}>
                            <div>
                                <label htmlFor="username">username</label>
                                <input type="text" name="username"  placeholder="username" id="username" required autoComplete="off" value={data.username} onChange={handleinput}/>
<br />
                                <label htmlFor="email">email</label>
                                <input type="email" name="email"  placeholder="enter your email" id="email" required autoComplete="off" value={data.email} onChange={handleinput} />
<br />
                                <label htmlFor="phone">phone</label>
                                <input type="number" name="phone"  placeholder="enter phone no" id="phone" required autoComplete="off" value={data.phone} onChange={handleinput} />
<br />
                             
                            </div>
                            <br />
                            <button type="submit" className="btn btn-submit">update </button>
                           </form>
                        </div>

                    </div>
                </div>
            </main>
        </section>
    </>
};
