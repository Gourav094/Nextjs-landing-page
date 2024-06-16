import {connect} from "@/dbConfig/db"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs";

connect() 

export async function get(req:NextRequest){
    try{    
        const reqBody = await req.json()
        const {token} = reqBody
    
        const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:Date.now()}})
    
        if(!user){
            return NextResponse.json({
                message:"Invlid token",
                status:400
            })
        }
        user.isVerified = true
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save()
        const response = NextResponse.json({
            message:"Email verified successfuly",
            status:400
        })
        return response
    }catch(error:any){
        return NextResponse.json({
            error:error,
            status:400
        })
    }
} 