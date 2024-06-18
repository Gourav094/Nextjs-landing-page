'use client'
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import {toast} from "react-hot-toast"

export default function Profile (){
    const router = useRouter()

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
            router.push("/login")
        }
        catch(error:any){
            toast.error(error.message)
        }
    }

    return (
        <div className=" overflow-y-auto sm:p-0 pt-4 pr-4 pb-20 pl-4 bg-gray-800">
            <div className="flex justify-center items-center text-center min-h-screen sm:block">
                <div className="bg-gray-500 transition-opacity bg-opacity-75"></div>
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen">​</span>
                <div className= "inline-block text-left bg-gray-900 rounded-lg overflow-hidden align-bottom transition-all transform shadow-2xl sm:my-8 sm:align-middle sm:max-w-xl sm:w-full">
                <div className="items-center w-full mr-auto ml-auto relative max-w-7xl md:px-12 lg:px-24">
                    <div className="flex gap-2 items-center absolute p-3 top-0 left-0 cursor-pointer" onClick={() => router.push("/")}>
                        <Image 
                            src="/left-arrow.png"
                            alt="Profile"
                            width={20}  // Width in pixels
                            height={20} // Height in pixels
                        />
                        <p>back</p>
                    </div>
                    <div className="grid grid-cols-1">
                    <div className="mt-4 mr-auto mb-4 ml-auto bg-gray-900 max-w-lg">
                        <div className="flex flex-col items-center pt-6 pr-6 pb-6 pl-6">
                        <Image 
                            src="/user.png"
                            alt="Profile"
                            width={64}  // Width in pixels
                            height={64} // Height in pixels
                            className="flex-shrink-0 object-cover object-center w-16 h-16 mr-auto -mb-8 ml-auto rounded-full shadow-xl"
                        />
                        <p className="mt-10 text-xl font-medium leading-none text-white tracking-tighter lg:text-xl">{userData?.name}</p>
                        <p className="text-sm text-gray-300">{userData?.username}</p>
                        <p className="mt-1 text-base leading-relaxed text-center text-gray-200">{userData?.email}</p>
                        <p className="mt-2">verified ✔</p>
                        <div className="w-full mt-6 cursor-pointer" onClick = {Logout}>
                            <a className="flex text-center items-center justify-center w-full pt-4 pr-10 pb-4 pl-10 text-base
                                font-medium text-white bg-indigo-600 rounded-xl transition duration-500 ease-in-out transform
                                hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Log out</a>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    )
} 