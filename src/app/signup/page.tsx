"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function LoginPage() {
    const [user,setUser] = useState({
        email:"",
        password:"",
    })
    return (
        <div className = "flex flex-col gap-4 items-center justify-center min-h-screen min-w-sceen bg-violet-100 text-gray-800">
            <h1 className = "text-2xl pb-10 font-semibold">Welcome back!</h1>
            <div className="flex flex-col  gap-2 items-start w-1/4">
                <label htmlFor = "username">Email</label>
                <input placeholder="username" type="Email" id="username" className=" outline-none rounded-lg bg-gray-300 text-gray-800 px-3 py-2 w-full" 
                    value={user.email} onChange={(e) => setUser({...user,email:e.target.value})}/>
            </div>
            <div className="flex flex-col  gap-2 items-start w-1/4">
                <label htmlFor = "username">Password</label>
                <input placeholder="username" type="text" id="username" className=" outline-none rounded-lg bg-gray-300 text-gray-800 px-3 py-2 w-full" 
                    value={user.password} onChange={(e) => setUser({...user,password:e.target.value})}/>
            </div>
            <Link href="/login">Already have an account? Login here</Link>
            <button className="text-slate-200 border py-2 px-4 rounded-lg bg-gray-900" onClick={() => console.log(user)}>Signup</button>
        </div>
    )
}