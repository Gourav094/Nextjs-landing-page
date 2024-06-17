import {connect} from "@/dbConfig/db"
import User from "@/models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/mailer";

connect()

export async function POST(req:NextRequest){
    try{
        const reqBody = await req.json()
        const {name,username,email,password} = reqBody

        const user = await User.findOne({username});
        console.log(user,reqBody)
        if(user){
            return NextResponse.json({
                error:"Username already exist",
                status: 400
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword =await bcryptjs.hash(password,salt)

        const newUser = new User({
            name,
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save()

        await sendEmail({email,emailType:"VERIFY",userId: savedUser._id});

        return NextResponse.json({
            message:"Account created successfully",
            success: true,
            status:201,
            user: savedUser
        })
    }
    catch(error:any){
        return NextResponse.json({error: error.message}, {status: 500})
    }
}
