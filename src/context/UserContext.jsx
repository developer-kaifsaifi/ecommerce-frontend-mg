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
    
// async function loginUser (email, navigate) {
    
//     setBtnLoading(true)

//     try {
//         const { data } = await axios.post(`${server}/user/login`,{email})
//         toast.success(data.message)
//         localStorage.setItem("email",email)
//         navigate("/verify", {
//   state: {
//     email,
//   },
// });
//         setBtnLoading(false)

        
//     } catch (error) {
//         toast.error(error.response.data.message)
//         setBtnLoading(false)
        
//     }

// }     


export const loginUser = useTryCatch(async (req, res) => {
    const { email } = req.body;
    console.log("1. API Hit: Request aayi email ke liye ->", email);

    const subject = "OTP for Ecommerce login";
    const otp = Math.floor(Math.random() * 1000000);

    console.log("2. Database check kar rahe hain...");
    const prevOtp = await OTP.findOne({ email });
    console.log("3. Database check done.");

    if (prevOtp) {
        await prevOtp.deleteOne();
    }

    console.log("4. Email bhejne ki koshish kar rahe hain...");
    await sendOtp({ email, subject, otp });
    console.log("5. Email successfully chala gaya!");

    await OTP.create({ email, otp });
    console.log("6. Naya OTP database me save ho gaya.");

    res.json({
        message: "otp send to your mail"
    });
});

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
            path: "/"
        })

        
    } catch (error) {
        toast.error(error.response.data.message)
        setBtnLoading(false)
        
    }

}     


async function fetchUser () {
    try {
        const { data } = await axios.get(`${server}/user/me`, {
            headers:{
                token:Cookies.get("token")
            }
        })

        setIsAuth(true)
        setUser(data)
        setLoading(false)
        

        
    } catch (error) {

        console.log(error);
        setIsAuth(false)
        setLoading(false)
        
        
    }
}

function logoutUser(navigate) {

    Cookies.remove("token", {
        path: "/"
    });

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
