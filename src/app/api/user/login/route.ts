import {connect} from "@/dbConfig/db"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken"
connect()

export async function POST(req:NextRequest){
    try{
        const reqBody = await req.json()
        const {email, password} = reqBody

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({
                error:"User doesn't exist",
                status:400
            })
        }
        const validPassword =await bcryptjs.compare(password,user.password)
        if(!validPassword){
            return NextResponse.json({
                error:"Please enter correct password",
                status:400
            })
        }
        
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET!, { expiresIn: '1d' });
        console.log(user,token)
        const response = NextResponse.json({
            message: "User logged in",
            success: true,
            status: 200
        }, { status: 200 });

        response.cookies.set("token", token, {
            httpOnly: true,
        });

        return response;
    }
    catch(error:any){
        return NextResponse.json({error: error.message}, {status: 500})
    }

}