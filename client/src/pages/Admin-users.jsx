import { useEffect, useState } from "react"
import { useAuth } from "../store/auth"
import {Link} from "react-router-dom";

export const Adminusers = () =>{
    const {authorizationtoken} = useAuth();
    const [users,setUsers] = useState([])
    
 const getAllusers = async () =>{
    try {
        const responce = await fetch("http://localhost:5000/api/admin/users",{
            method:"GET",
            headers:{
                Authorization: authorizationtoken,
            },

        })
        const data = await responce.json();
        console.log(`users ${data}`)
        setUsers(data);
    } catch (error) {
        next(error);
    }
}
//delet the user on delete button 
const deleteUser = async(id) =>{
    try {
        const responce = await fetch(`http://localhost:5000/api/admin/users/delete/${id}`,{
            method:"DELETE",
            headers:{
                Authorization: authorizationtoken,
            },

        })
        const data = await responce.json();
        console.log(`user after delete ${data}`)
       if(responce.ok)
        {
            getAllusers();
        } 
    } catch (error) {
        next(error);
    }
}

    useEffect(() =>{
        getAllusers();
    },[])

    return<>
        <section>
            <div className="container">
                <h1>Admin users Data</h1>
            </div>
            <div className="container admin-users">
            

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-3">
                   UserName
                </th>
                <th scope="col" className="px-6 py-3">
                    EMail
                </th>
                <th scope="col" className="px-6 py-3">
                    Phone
                </th>
                <th scope="col" className="px-6 py-3">
                    Edit
                </th>
                <th scope="col" className="px-6 py-3">
                    Update
                </th>
            </tr>
        </thead>
        <tbody>
        {users.map((curuser,index) =>{
            return <>
            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {curuser.username}
                </th>
                <td className="px-6 py-4">
                {curuser.email}
                </td>
                <td className="px-6 py-4">
                {curuser.phone}                </td>
                <td className="px-6 py-4">
               <Link to={`/admin/users/${curuser._id}/edit`}>Edit</Link>
                </td>
                <td className="px-6 py-4">
                    {/* <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a> */}
                  <button onClick={() => deleteUser(curuser._id)}> Delete</button>
                </td>
            
            </tr>
            </>
        })}
        </tbody>
    </table>
</div>


        
              
                  
            
               
             
            </div>
        </section>
    
    
    {/* {users.map((curuser,index) =>{
        return <h2 key={index}>{curuser.username}</h2>
    })} */}

    </>
}