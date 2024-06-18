"use client"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5"

export default function LoginPage() {
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [userData,setUserData] = useState({
        email:"",
        password:"",
    })

    const handleLogin = async(e:any) => {
        e.preventDefault()
        if(userData.email.length === 0 || userData.password.length === 0){
            toast.error("Please fill all the details")
        }
        try{
            setLoading(true)
            const response = await axios.post("/api/user/login",userData)
            if(response.data.status === 200){
                toast.success(response.data.message)
                router.push('/')
            }else{
                toast.error(response.data.error)
                if(response.data.status === 401){
                    toast.error("Please check your email")
                }
            }
        }
        catch(error:any){
            console.log("getting error in signup",error.message)
        }
        finally{
            setLoading(false)
        }
    }

    return (
        <form onSubmit={handleLogin} className = "flex flex-col gap-4 px-4 items-center justify-center min-h-screen min-w-sceen bg-violet-100 text-gray-800">
            <h1 className = "text-2xl pb-10 font-semibold">Welcome back!</h1>
            <div className="flex flex-col  gap-2 items-start w-full md:w-1/4">
                <label htmlFor = "username">Email</label>
                <input placeholder="username" type="Email" id="username" className=" outline-none rounded-lg bg-gray-300 text-gray-800 px-3 py-2 w-full" 
                    value={userData.email} onChange={(e) => setUserData({...userData,email:e.target.value})}/>
            </div>
            <div className="flex flex-col relative gap-2 items-start w-full md:w-1/4">
                <label htmlFor = "username">Password</label>
                <input placeholder="username" type={showPassword ? "text" : "password"} id="username" className=" outline-none rounded-lg bg-gray-300 text-gray-800 px-3 py-2 w-full" 
                    value={userData.password} onChange={(e) => setUserData({...userData,password:e.target.value})}/>
                <div className="absolute inset-y-0 right-0 pr-3 pt-8 flex items-center text-lg leading-5" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </div>
            </div>
            <Link href="/signup">Don&apos;t have account? Signup here</Link>
            <button className="text-slate-200 border py-2 px-4 rounded-lg bg-gray-900" onClick={handleLogin}>Login</button>
            <p className="cursor-pointer py-2 text-gray-600" onClick={() => {
                setUserData({
                    email: "guest@gmail.com",
                    password: "guest1234"
                })
            }}>Login as a guest</p>
        </form>
    )
}