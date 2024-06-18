'use client'
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function VerifyEmail() {
    const [token,setToken] = useState("")
    const [message,setMessage] = useState("")

    useEffect(() => {
        const url = window.location.search.split("=")[1];
        setToken(url)
    },[])

    const verifyEmail = async() => {
        try{    
            const response = await axios.post("/api/user/verifyemail",{token})
            if(response.data){
                setMessage(response.data.message)
            }
        }catch(error:any){
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if(token){
            verifyEmail()
        }
    },[token])

    return (
        <div className="flex flex-col items-center justify-center gap-10 py-[10%]">
            <p>{message || "verifying..."}</p>
            <Link href="/" className="text-gray-100 font-semibold hover:text-gray-500 text-lg ">
                Go back
            </Link>
        </div>
    )
}