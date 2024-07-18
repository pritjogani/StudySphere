import { BrowserRouter, Route, Routes} from "react-router-dom"
import {Home} from "./pages/Home";
import {About} from "./pages/About";
import {Contact} from "./pages/Contact";
import {Service} from "./pages/Service";
import {Login} from "./pages/Login";
import {Register} from "./pages/Register";
import Navbar from "./components/Navbar";
import { Logout } from "./pages/Logout";
import { AdminLayout } from "./components/layouts/Admin-Layout";
import { Adminusers } from "./pages/Admin-users";
import { Admincontacts } from "./pages/Admin-contacts";
import { Adminupdate } from "./pages/Admin-Update";


const App = () =>{
  return <>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
              

        {/* nested route create */}
        <Route path="/admin" element={<AdminLayout />}>
        <Route path="users" element={<Adminusers />} />
        <Route path="contacts" element={<Admincontacts />} />
        <Route path="/admin/users/:id/edit" element={<Adminupdate />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </>
}
export default App;