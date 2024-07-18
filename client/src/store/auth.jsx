import {createContext, useContext, useEffect, useState }  from 'react';

//context pass the data globally and props pass data as a argument


//context
export  const AuthContext = createContext();


//provider function
export const AuthProvider = ({children}) =>{

    //tackling the logout functionality
    const [token,setToken] = useState(localStorage.getItem("token"))
    const [user,setUser] = useState("");
    const [service, setservices] = useState([])
    const authorizationtoken = `Bearer ${token}`;
    const [isloading,setIsloading] = useState(true);


    const Logoutuser = () =>{
        setToken("");
        return localStorage.removeItem("token")
    
    }
    let isLoggedIn = !!token;
    console.log(isLoggedIn);
    


    //any componenet acccess to this
const storeTokenInLS = (serverToken) =>{
    setToken(serverToken);
    return localStorage.setItem("token" , serverToken);
}


 //jwt authentication -to get the currently user data
 const userAuthentication = async () =>{
    try {
        setIsloading(true); 
        const responce = await fetch("http://localhost:5000/api/auth/user",{
            method:"GET",
            headers:{
                Authorization: authorizationtoken,
            },
        });

        if(responce.ok){
            const data = await responce.json();
            console.log("user data",data.userData)
            setUser(data.userData)
            setIsloading(false);

        }
        else{
            console.log("errror fetching user data")
            setIsloading(false);
        }
    } catch (error) {
        console.log("error fetching user data")
    }
 }

// to fetch the sevices to database
 const getservices = async() =>{
try {
    const responce = await fetch("http://localhost:5000/api/data/service" ,{
        method:"GET",
    })
    if(responce.ok)
        {
            const data = await responce.json();
            console.log(data.msg)
            setservices(data.msg )
        }
} catch (error) {
    console.log(`services fronted error ${error}`)
}
 }


 useEffect(() =>{
    getservices();
    userAuthentication();
 },[]) 

    return <AuthContext.Provider value={{storeTokenInLS , Logoutuser,isLoggedIn,user,service,authorizationtoken,isloading}}>
        {children}
    </AuthContext.Provider>

}

//consumer delivery function
export const useAuth = () =>{

    //return useContext(AuthContext)
    const AuthContextValue  = useContext(AuthContext);
    if(!AuthContextValue){
        throw new console.error(("useAuth used outside of the provider"));
    }
    return AuthContextValue;

}
