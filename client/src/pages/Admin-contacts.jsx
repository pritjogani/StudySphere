import { useEffect, useState } from "react"
import { useAuth } from "../store/auth"

export const Admincontacts = () =>{
const [contactdata, setContactdata] = useState([]);
const {authorizationtoken} = useAuth();

const deletecontact = async(id) =>{
    try {
        const responce = await fetch(`http://localhost:5000/api/admin/contacts/delete/${id}`,{
            method:"DELETE",
            headers:{
                Authorization: authorizationtoken,
              
            }
        })
        const data = await responce.json();
        if(responce.ok)
            {
                console.log(data)
                getContactdata();
            }
    } catch (error) {
        console.log(error)
    }
}


const getContactdata = async () =>{
    try {

        const responce = await fetch('http://localhost:5000/api/admin/contacts',{
            method:"GET",
            headers:{
                Authorization: authorizationtoken,
                "Content-Type":"application/json"
            }
        })
        const data = await responce.json();
        if(responce.ok)
            {
                console.log(data)
                setContactdata(data);
            }
    } catch (error) {
        console.log(error)
    }
}

useEffect(() =>{
    getContactdata();
},[])

    return <>
       {contactdata.map((curElem,index)=>{
        return (
            <div key={index}>
                <p>{curElem.username}</p>
                <p>{curElem.email}</p>
                <p>{curElem.message}</p>
                <button className="btn" onClick={()=>deletecontact(curElem._id)} >delete</button>
            </div>

        );
       })} 
    </>
}