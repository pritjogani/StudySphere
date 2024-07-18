import { NavLink, Outlet, Navigate } from "react-router-dom"
import { useAuth } from "../../store/auth"

export const AdminLayout = () =>{
    const {user, isloading} =useAuth();
    if(isloading)
        {
            return <h1>..is loading</h1>
            
        }
    if(!user.isAdmin)
        {
            return <Navigate to="/" />
        }
    return <>

        <header>
            <div className="container">
            <nav>
                <ul>
                    <li>
                    <NavLink to="/admin/users">users</NavLink>
                     </li>
                    <li>
                    <NavLink to="/admin/contacts">contacts</NavLink>
                    </li>
                    <li>services</li>
                    <li>Home</li>
                </ul>
            </nav>
            </div>
        </header>
        <Outlet />
    </>
}