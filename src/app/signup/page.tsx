"use client"
import Loader from "@/components/Loader"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"

export default function SignUp() {
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [userData,setUserData] = useState({
        name:"",
        username:"",
        email:"",
        password:"",
    })

    const handleSignUp = async(e:any) => {
        e.preventDefault()
        if(userData.username.length === 0 || userData.email.length === 0 || userData.password.length === 0){
            toast.error("Please fill all the details")
        }
        try{
            setLoading(true)
            const response = await axios.post("/api/user/signup",userData)
            toast.success(response.data.message)
            router.push("/login")
        }
        catch(error:any){
            console.log("getting error in signup",error.message)
        }
        finally{
            setLoading(false)
        }
    }


    return (
        <form onSubmit={handleSignUp} className = "flex flex-col gap-4 items-center justify-center min-h-screen min-w-sceen bg-violet-100 text-gray-800">
            <h1 className = "text-2xl pb-10 font-semibold px-4">Welcome To Over Website!</h1>
            <div className="flex flex-col  gap-2 items-start w-full px-4 md:w-1/4">
                <label htmlFor = "username">Name</label>
                <input placeholder="username" type="text" value={userData.name} onChange={(e) => setUserData({...userData,name:e.target.value})} id="username" className=" outline-none rounded-lg bg-gray-300 text-gray-800 px-3 py-2 w-full" />
            </div>
            <div className="flex flex-col  gap-2 items-start w-full px-4 md:w-1/4">
                <label htmlFor = "username">UserName</label>
                <input placeholder="username" type="text" value={userData.username} onChange={(e) => setUserData({...userData,username:e.target.value})} id="username" className=" outline-none rounded-lg bg-gray-300 text-gray-800 px-3 py-2 w-full" />
            </div>
            <div className="flex flex-col  gap-2 items-start w-full px-4 md:w-1/4">
                <label htmlFor = "username">Email</label>
                <input placeholder="username" type="Email" id="username" className=" outline-none rounded-lg bg-gray-300 text-gray-800 px-3 py-2 w-full" 
                    value={userData.email} onChange={(e) => setUserData({...userData,email:e.target.value})}/>
            </div>
            <div className="relative flex flex-col  gap-2 items-start w-full px-4 md:w-1/4">
                <label htmlFor = "username">Password</label>
                <input placeholder="username" type={showPassword ? "text" : "password"} className=" outline-none rounded-lg bg-gray-300 text-gray-800 px-3 py-2 w-full" 
                    value={userData.password} onChange={(e) => setUserData({...userData,password:e.target.value})}/>

                <div className="absolute inset-y-0 right-0 pr-8 pt-8 flex items-center text-lg leading-5" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </div>
            </div>
            <Link href="/login" className="px-4">Already have an account? Login here</Link>
            <div>
            <button className="flex w-full items-center justify-center rounded-md bg-gray-800 px-3 py-1.5  text-white shadow-sm" onClick={handleSignUp}>
                {loading && <Loader/>}
                Sign Up
            </button>
            </div>
        </form>
    )
}