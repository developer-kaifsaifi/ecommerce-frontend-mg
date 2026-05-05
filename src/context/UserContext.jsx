import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { server } from "../main.jsx";
import Cookies from "js-cookie"


const UserContext = createContext()

export const UserProvider = ({children}) => {

    const [user,setUser] = useState(null)
    const [loading,setLoading] = useState(true)
    const [btnLoading,setBtnLoading] = useState(false)
    const [isAuth,setIsAuth] = useState(false)
    
async function loginUser (email, navigate) {
    
    setBtnLoading(true)

    try {
        const { data } = await axios.post(`${server}/user/login`,{email})
        toast.success(data.message)
        localStorage.setItem("email",email)
        navigate("/verify", {
  state: {
    email,
  },
});
        setBtnLoading(false)

        
    } catch (error) {
        toast.error(error.response.data.message)
        setBtnLoading(false)
        
    }

}     


async function verifyUser (otp, navigate) {
    
    setBtnLoading(true)
    const email = localStorage.getItem("email")

    try {
        const { data } = await axios.post(`${server}/user/verify`,{email,otp})
        toast.success(data.message)
        localStorage.clear()
        navigate("/");
        setBtnLoading(false);
        setIsAuth(true)
        setUser(data.user)
          Cookies.set("token", data.token, {
  expires: 15,
  secure: true,
  sameSite: "None",
  path: "/"
});

        
    } catch (error) {
        toast.error(error.response.data.message)
        setBtnLoading(false)
        
    }

}     

async function fetchUser () {

    const token = Cookies.get("token");

    // 🛑 IMPORTANT GUARD
    if (!token) {
        setIsAuth(false);
        setUser(null);
        setLoading(false);
        return;
    }

    try {
        const { data } = await axios.get(`${server}/user/me`, {
            headers:{
                token
            }
        });

        setIsAuth(true);
        setUser(data);
        setLoading(false);

    } catch (error) {

        // 🧨 INVALID TOKEN CLEANUP
        Cookies.remove("token", {
            path: "/",
            secure: true,
            sameSite: "None"
        });

        setIsAuth(false);
        setUser(null);
        setLoading(false);
    }
}



function logoutUser(navigate) {

    Cookies.remove("token", {
  path: "/",
  secure: true,
  sameSite: "None"

  
});

localStorage.clear(); 

    setUser(null);

    setIsAuth(false);

    toast.success("Logged Out");

    navigate("/login");
}


useEffect(()=>{
    fetchUser()
},[])



    return <UserContext.Provider value={{loading,user, logoutUser, btnLoading, isAuth, loginUser, verifyUser }} >{children}</UserContext.Provider>
}

export const UserData = () => useContext(UserContext)
