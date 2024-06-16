'use client'
import axios from "axios"
import { useEffect, useState } from "react"
import {toast} from "react-hot-toast"

export default function Profile (){
    const [userData,setUserData] = useState<any>(null)

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await axios.get("/api/user/profile")
                setUserData(response.data.user)
            }catch(error:any){
                console.log("getting error in fetching user details")
            }
        }
        fetchData()
    },[])   

    const Logout = async () => {
        try{
            await axios.get('/api/user/logout')
            toast.success('Logout successful')
        }
        catch(error:any){
            toast.error(error.message)
        }
    }

    return (
        <div className="text-white text-lg flex flex-col items-center  justify-center">
            <h1>profile</h1>
            <p>{userData?._id}</p>
            <p>{userData?.email}</p>
            <p>{userData?.username}</p>
            <hr/>            <button className="flex items-center justify-center rounded-md bg-indigo-600 text-sm font-semibold leading-6 hover:bg-indigo-500 px-3 py-1.5  text-white shadow-sm" onClick={Logout}>
                    Logout
            </button>
        </div>
    )
} 